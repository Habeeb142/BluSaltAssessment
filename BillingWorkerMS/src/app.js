const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const createError = require('http-errors');
const logging = require('../config/logging');
const app = express();
const helmet = require('helmet');
const NAMESPACE = 'App';

const mq = require('../config/messageQueue')

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self"],
                scriptSrc: ["'self"]
            }
        },
        referrerPolicy: { policy: 'same-origin' }
    })
);
// handle cors
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    return next();
});
/**
 * set up route here
 */
 const createBillingWorkerRoute = require('./routes/createBillingWorkerRoute');
 const getBillingWorkerRoute = require('./routes/getBillingWorkerRoute');
//  const updateBillingRoute = require('./routes/updateBillingRoute');
 
 const mssqlDatasource = require('./store/dataSource');
 /**
  * connect DB
  */
 mssqlDatasource
     .connect()
     .then(async (_) => {
         logging.info(NAMESPACE, 'Database connected');
     })
     .catch((err) => {console.log(err)
         logging.info(NAMESPACE, 'Error connecting to DB');
     });
 
 // make use of morgan
 app.use(logger('dev'));
 // allow collection of payload from body
 app.use(express.json({limit: '50mb'}));
 app.use(express.urlencoded({ extended: false }));
 
 app.get('/', (req, res) => {
     res.status(200).json({
         status: true,
         message: 'Server running'
     });
 });
 
 app.use('/CreateBillingWorker', createBillingWorkerRoute);
 app.use('/GetBillingWorker', getBillingWorkerRoute);
//  app.use('/UpdateBilling', updateBillingRoute);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 400);
    res.json({ error: err.message, message: 'Operation failed' });
});

mq.connectQueue()

module.exports = app;