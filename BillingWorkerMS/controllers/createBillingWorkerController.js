const { InternalServerError } = require('http-errors');
const CrudRepository = require('../src/store/crudStore');
const { validationResult, Result } = require('express-validator');
const axios = require('axios')

exports.createBillingWorker = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.array())
                return res.status(400).json({ messages: errors.array() });
            }
            const data = {
                ...req.body
            };
            
            const result = await new CrudRepository().createBillingWorker(data);
            // wait 1000ms and update Billing Status
            await setTimeout(async() => {
                await axios.patch(`${process.env.BILLING_MS}/${result.transactionId}`, {status: "success"}, {headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.T-vHdnp4DIpuFBRqFrWr42yG-4zxUmxm7z7YHJeMon8' }})
            }, 1000);
         
            if (!result) {
                throw InternalServerError('Error Creating billing worker');
            }
            else {
                return res.status(200).json({
                    ...result
                });
            }
        } catch (error) {
            return res.status(error.status || error.statusCode || 500).json({
                isSuccess: false,
                message: error.message || 'Server error',
                error
            });
    }
};