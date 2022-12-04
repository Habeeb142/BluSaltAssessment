const { BadRequest } = require('http-errors');
const NAMESPACE = 'CrudRepository';
const logging = require('../../config/logging');
const mssqlDatasource = require('./dataSource');

class CrudRepository {
    constructor() {}

    // Create Customer
    async createCustomer(data) {
        try {
    
            if (!data) {
                throw new BadRequest('Field Cannot Be Empty');
            }
            return new Promise(async (resolve, reject) => {
                const res = await mssqlDatasource.connect();
                res.query(`EXEC isEmailExist @customerEmail = '${data.customerEmail}'`, async(err, result) => {
                        try {      
                    
                            if(result.recordset[0].count) {
                                resolve({
                                    isSuccess: false,
                                    message: 'Customer Already exist with the same email'
                                })
                            }
                            else {
                                res.query(`Exec CreateCustomer @customerFirstName = '${data.customerFirstName}', @customerLastName = '${data.customerLastName}', @customerEmail = '${data.customerEmail}', @customerSex = '${data.customerSex}', @customerAge = ${data.customerAge}`, async(err, result) => {
                                   try {
                                       if (err) {
                                           logging.error(NAMESPACE, err.message || '', err);
                                           reject({message: 'Error creating a customer', err: true});
                                       }
                                       else {
                                           resolve({
                                               isSuccess: true,
                                               message: 'Customer Successfully Created',
                                               username: data.customerEmail,
                                               customerId: result.recordset[0].customerId
                                           })
                                       }
                                   } catch (error) {
                                        reject(error);
                                   }
                                });
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

    // Get Customer
    async getAllCustomers() {
        try {
            return new Promise(async (resolve, reject) => {
                const res = await mssqlDatasource.connect();
                const selectSql = 
                `EXEC getAllCustomers`;
                res.query(selectSql, (err, result) => {
                    try {         
                        if (err) {
                            logging.error(NAMESPACE, err.message || '', err);
                            reject(err);
                        }
                        else {
                            resolve({
                                isSuccess: true,
                                message: 'Customers Sent to Queue',
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

    // Get Customer
    async getCustomerByCustomerId(customerId) {
        try {
            return new Promise(async (resolve, reject) => {
                const res = await mssqlDatasource.connect();
                const selectSql = 
                `EXEC getCustomerByCustomerId @customerId = '${customerId}'`;
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
                                    message: 'Customer Sent to Queue',
                                    data: result.recordset
                                })
                            }
                            else {
                                resolve({
                                    isSuccess: true,
                                    message: 'Customer not found',
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

    // Get Customer
    async getCustomerByEmail(email) {
        try {
            return new Promise(async (resolve, reject) => {
                const res = await mssqlDatasource.connect();
                const selectSql = 
                `EXEC getCustomerByEmail @email = '${email}'`;
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
                                            message: 'Customer Sent to Queue',
                                            data: result.recordset
                                        })
                                    }
                                    else {
                                        resolve({
                                            isSuccess: true,
                                            message: 'Customer not found',
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

    // Delete Customer
    async deleteCustomer(id) {
        try {
            return new Promise(async (resolve, reject) => {
                const res = await mssqlDatasource.connect();
           
                res.query(`EXEC isCustomerIdExist @customerId = ${id}`, async(err, result) => {
                    try {        
                        if(result.recordset[0].count) {
                            res.query(`EXEC deleteCustomer @customerId = ${id}`, (err, result) => {
                                try {
                                    if (err) {
                                        logging.error(NAMESPACE, err.message || '', err);
                                        reject(err);
                                    }
                                    else {                      
                                        resolve({
                                            isSuccess: true,
                                            message: 'Deleted Successfully'
                                        })                        
                                    }
                                } catch (error) {
                                    reject(error)
                                }    
                            });
                        }
                        else {
                            resolve({
                                isSuccess: false,
                                message: 'Customer Does not exist'
                            })
                        }
                    } catch (error) {
                        reject(error)
                    }
                })
        
            });
        } catch (error) {
            reject(error);
        }
    }

    async updateActivationStatus(data, id) {
        try {
            return new Promise(async (resolve, reject) => {
                const res = await mssqlDatasource.connect();
                res.query(`EXEC isCustomerIdExist @customerId = ${id}`, async(err, result) => {
                        try {        
                            if(result.recordset[0].count) {
                                res.query(`EXEC updateActivationStatus @customerId = '${id}', @activationStatus = ${data.activationStatus}`, (err, result) => {
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
                                    message: 'Customer Does not exist'
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