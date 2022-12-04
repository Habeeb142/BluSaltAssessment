const { BadRequest } = require('http-errors');
const NAMESPACE = 'CrudRepository';
const logging = require('../../config/logging');
const mssqlDatasource = require('./dataSource');
const axios = require('axios')

class CrudRepository {
    constructor() {}

    // Create Billing
    async createBilling(data) {
        try {
    
            if (!data) {
                throw new BadRequest('Field Cannot Be Empty');
            }
            return new Promise(async (resolve, reject) => {
                const res = await mssqlDatasource.connect();

                res.query(`Exec CreateBilling @customerId = '${data.customerId}', @transactionAmount = ${data.transactionAmount}`, async(err, result) => {
                    try {
                        if (err) {
                            logging.error(NAMESPACE, err.message || '', err);
                            reject({message: 'Error creating a billing', err: true});
                        }
                        else {
                            const transactionReference = Math.random().toString(36).substring(2, 15)
                            try {
                                await axios.post(`http://localhost:4000/CreateBillingWorker`, {transactionId: result.recordset[0].transactionId, transactionReference, bankName: data.bankName, bankAccountNumber: data.bankAccountNumber}, {headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.T-vHdnp4DIpuFBRqFrWr42yG-4zxUmxm7z7YHJeMon8' }})
                                resolve({
                                    isSuccess: true,
                                    message: 'Billing Successfully Created',
                                    transactionAmount: data.transactionAmount,
                                    transactionId: result.recordset[0].transactionId,
                                    transactionReference
                                })
                            } catch (error) {
                                reject(error);
                            }
                        }
                    } catch (error) {
                        reject(error);
                    }
                });
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
}

module.exports = CrudRepository;