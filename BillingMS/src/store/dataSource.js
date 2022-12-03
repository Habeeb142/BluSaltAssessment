const sql = require('mssql');

const config = require('../../config');
const logging = require('../../config/logging');

const NAMESPACE = 'mssql Datasource';

class MsSqlDBDataSource {
    async connect() {
        try {
            const Config = {
                user: config.server.dbUser,
                password: config.server.dbPassword,
                server: config.server.dbHost,
                database: config.server.dbName,
                ssl: true,
                options: {
                    encrypt: true,
                    trustServerCertificate: true
                }
            };

            return new Promise((resolve, reject) => {
                sql.connect(Config, function (error) {
                    if (error) {
                        logging.error(NAMESPACE, '', error);
                        return reject(error);
                    }
                    // create Request object
                    var request = new sql.Request();
                    resolve(request);
                });
            });
        } catch (error) {
            logging.error(NAMESPACE, 'Error connecting to MSSQL datasource', error);
            throw Error('Error connecting to datasource');
        }
    }
}

module.exports = new MsSqlDBDataSource();