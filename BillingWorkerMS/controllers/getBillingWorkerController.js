const { NotFound } = require('http-errors');
const CrudRepository = require('../src/store/crudStore');
const mq = require('../config/messageQueue')

exports.getBillingWorkerByTransactionId = async (req, res) => {
    try {

        const data = await new CrudRepository().getBillingWorkerByTransactionId(req.params.transactionId);
        if (!data) {
            throw NotFound('No Billing found');
        }
        await mq.sendData(data.data)
        return res.status(200).json({
            ...data
        });

    } catch (error) {
        return res.status(error.status || error.statusCode || 500).json({
            isSuccess: false,
            message: error.message || 'Server error',
            error
        });
    }
};

exports.getAllBillingWorker = async (req, res) => {
    try {

        const data = await new CrudRepository().getAllBillingWorker();
        if (!data) {
            throw NotFound('No Billing found');
        }
        await mq.sendData(data.data)
        return res.status(200).json({
            ...data
        });

    } catch (error) {
        return res.status(error.status || error.statusCode || 500).json({
            isSuccess: false,
            message: error.message || 'Server error',
            error
        });
    }
};
