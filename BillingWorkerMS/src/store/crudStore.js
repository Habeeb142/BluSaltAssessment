const { BadRequest } = require('http-errors');
const NAMESPACE = 'CrudRepository';
const logging = require('../../config/logging');
const mssqlDatasource = require('./dataSource');

class CrudRepository {
    constructor() {}

    // Create Billing
    async createBillingWorker(data) {
        try {
    
            if (!data) {
                throw new BadRequest('Field Cannot Be Empty');
            }
            return new Promise(async (resolve, reject) => {
                const res = await mssqlDatasource.connect();
                res.query(`EXEC isTransactionIdExist @transactionId = '${data.transactionId}'`, async(err, result) => {
                    try {   
                        if(result.recordset[0].count) {
                            resolve({
                                isSuccess: false,
                                message: 'Transaction Id Already exist'
                            })
                        }
                        else {
                            res.query(`Exec createBillingWorker @transactionId = '${data.transactionId}', @transactionReference = '${data.transactionReference}', @bankName = '${data.bankName}', @bankAccountNumber = '${data.bankAccountNumber}'`, async(err, result) => {
                                try {
                                    if (err) {
                                        logging.error(NAMESPACE, err.message || '', err);
                                        reject({message: 'Error creating billing worker', err: true});
                                    }
                                    else {
                                        resolve({
                                            isSuccess: true,
                                            message: 'Billing Successfully Created',
                                            transactionId: data.transactionId,
                                            transactionReference: data.transactionReference
                                        })
                                    }
                                } catch (error) {console.log(error)
                                    reject(error);
                                }
                            });
                        }
                    }
                    catch (error) {console.log(error)
                        reject(error);
                    }
                })
             })
        }
        catch (error) {
            reject(error);
        }
    }  

    // Get Billing
    async getAllBillings() {
        try {
            return new Promise(async (resolve, reject) => {
                const res = await mssqlDatasource.connect();
                const selectSql = 
                `EXEC getAllBillings`;
                res.query(selectSql, (err, result) => {
                    try {         
                        if (err) {
                            logging.error(NAMESPACE, err.message || '', err);
                            reject(err);
                        }
                        else {
                            resolve({
                                isSuccess: true,
                                message: 'Billings Successfully Fetched',
                                data: result.recordset
                            })
                        }
                    } catch (error) {
                            reject(error);
                    }
                });
            });
        } catch (error) {
             reject(error);
        }
    }

    // Get Billing
    async getBillingByCustomerId(customerId) {
        try {
            return new Promise(async (resolve, reject) => {
                const res = await mssqlDatasource.connect();
                const selectSql = 
                `EXEC getBillingByCustomerId @customerId = '${customerId}'`;
                res.query(selectSql, (err, result) => {
                    try {          
                        if (err) {
                            logging.error(NAMESPACE, err.message || '', err);
                            reject(err);
                        }
                        else {
                            if(result.recordset.length) {
                                resolve({
                                    isSuccess: true,
                                    message: 'Billings Successfully Fetched',
                                    data: result.recordset
                                })
                            }
                            else {
                                resolve({
                                    isSuccess: true,
                                    message: 'Billing not found',
                                    data: {}
                                })
                            }
                        }   
                    } catch (error) {
                        reject(error);
                    }
                });
            });
        } catch (error) {
          reject(error);
        }
    }

    // Get Billing
    async getBillingByTransactionId(transactionId) {
        try {
            return new Promise(async (resolve, reject) => {
                const res = await mssqlDatasource.connect();
                const selectSql = 
                `EXEC getBillingByTransactionId @transactionId = '${transactionId}'`;
                res.query(selectSql, (err, result) => {
                            try {             
                                if (err) {
                                    logging.error(NAMESPACE, err.message || '', err);
                                    reject(err);
                                }
                                else {
                                    if(result.recordset.length) {
                                        resolve({
                                            isSuccess: true,
                                            message: 'Billing Successfully Fetched',
                                            data: result.recordset
                                        })
                                    }
                                    else {
                                        resolve({
                                            isSuccess: true,
                                            message: 'Biling not found',
                                            data: {}
                                        })
                                    }
                            }
                        } catch (error) {
                            reject(error);
                        }
                    });
            });
        } catch (error) {
            reject(error);
        }
    }

    async updateBillingStatus(data, id) {
        try {
            return new Promise(async (resolve, reject) => {
                const res = await mssqlDatasource.connect();
                res.query(`EXEC isTransactionIdExist @transactionId = ${id}`, async(err, result) => {
                        try {        
                            if(result.recordset[0].count) {
                                res.query(`EXEC updateTransactionStatus @transactionId = '${id}', @status = '${data.status}'`, (err, result) => {
                                    try {     
                                        if (err) {
                                            logging.error(NAMESPACE, err.message || '', err);
                                            reject(err);
                                        }
                                        else {                      
                                            resolve({
                                                isSuccess: true,
                                                message: 'Updated Successfully'
                                            })                          
                                        }
                                    } catch (error) {
                                        reject(error);
                                    }    
                                });
                            }
                            else {
                                resolve({
                                    isSuccess: false,
                                    message: 'Transaction Id Does not exist'
                                })
                            }
                        } catch (error) {
                            reject(error);
                        }
                    })
            });
        } catch (error) {
            reject(error);
        }
    }

    // Get Billing Worker
    async getBillingWorkerByTransactionId(transactionId) {
        try {
            return new Promise(async (resolve, reject) => {
                const res = await mssqlDatasource.connect();
                const selectSql = 
                `EXEC getBillingWorkerByTransactionId @transactionId = '${transactionId}'`;
                res.query(selectSql, (err, result) => {
                            try {             
                                if (err) {
                                    logging.error(NAMESPACE, err.message || '', err);
                                    reject(err);
                                }
                                else {
                                    if(result.recordset.length) {
                                        resolve({
                                            isSuccess: true,
                                            message: 'Billing Worker Successfully Sent to Queue',
                                            data: result.recordset
                                        })
                                    }
                                    else {
                                        resolve({
                                            isSuccess: true,
                                            message: 'Biling not found',
                                            data: {}
                                        })
                                    }
                            }
                        } catch (error) {
                            reject(error);
                        }
                    });
            });
        } catch (error) {
            reject(error);
        }
    }

    // Get Billing Worker
    async getAllBillingWorker() {
        try {
            return new Promise(async (resolve, reject) => {
                const res = await mssqlDatasource.connect();
                const selectSql = 
                `EXEC getAllBillingWorker`;
                res.query(selectSql, (err, result) => {
                            try {             
                                if (err) {
                                    logging.error(NAMESPACE, err.message || '', err);
                                    reject(err);
                                }
                                else {
                                    if(result.recordset.length) {
                                        resolve({
                                            isSuccess: true,
                                            message: 'Billing Worker Successfully Sent to Queue',
                                            data: result.recordset
                                        })
                                    }
                                    else {
                                        resolve({
                                            isSuccess: true,
                                            message: 'Biling not found',
                                            data: {}
                                        })
                                    }
                            }
                        } catch (error) {
                            reject(error);
                        }
                    });
            });
        } catch (error) {
            reject(error);
        }
    }
}

module.exports = CrudRepository;