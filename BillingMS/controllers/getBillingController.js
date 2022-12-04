const { NotFound } = require('http-errors');
const CrudRepository = require('../src/store/crudStore');
const mq = require('../config/messageQueue')
const axios = require('axios');
const { concatResponses } = require('../services/concatMSResoponses')

exports.getAllBillings = async (req, res) => {
    try {

        const data = await new CrudRepository().getAllBillings();
        await axios.get('http://localhost:4000/GetBillingWorker/getAllBillingWorker', {headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.T-vHdnp4DIpuFBRqFrWr42yG-4zxUmxm7z7YHJeMon8' }})
        await axios.get('http://localhost:2000/GetCustomer/getAllCustomers', {headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.T-vHdnp4DIpuFBRqFrWr42yG-4zxUmxm7z7YHJeMon8' }})

        if (!data) {
            throw NotFound('No Billing found');
        }
        const billing_worker = await mq.consumeDataBilling("billing_worker_ms_queue")
        const customer = await mq.consumeDataCustomer("customer_ms_queue")

        data.data = await concatResponses(data.data, JSON.parse(billing_worker), JSON.parse(customer))

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

exports.getBillingByCustomerId = async (req, res) => {
    try {

        const data = await new CrudRepository().getBillingByCustomerId(req.params.customerId);
        await axios.get('http://localhost:4000/GetBillingWorker/getAllBillingWorker', {headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.T-vHdnp4DIpuFBRqFrWr42yG-4zxUmxm7z7YHJeMon8' }})
        await axios.get(`http://localhost:2000/GetCustomer/getByCustomerId/${req.params.customerId}`, {headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.T-vHdnp4DIpuFBRqFrWr42yG-4zxUmxm7z7YHJeMon8' }})

        if (!data) {
            throw NotFound('No Billing found');
        }
        const billing_worker = await mq.consumeDataBilling("billing_worker_ms_queue")
        const customer = await mq.consumeDataCustomer("customer_ms_queue")

        data.data = await concatResponses(data.data, JSON.parse(billing_worker), JSON.parse(customer))


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

exports.getBillingByTransactionId = async (req, res) => {
    try {

        const data = await new CrudRepository().getBillingByTransactionId(req.params.transactionId);

        await axios.get(`http://localhost:4000/GetBillingWorker/getBillingWorkerByTransactionId/${req.params.transactionId}`, {headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.T-vHdnp4DIpuFBRqFrWr42yG-4zxUmxm7z7YHJeMon8' }})
        await axios.get(`http://localhost:2000/GetCustomer/getByCustomerId/${data['data'][0].customerId}`, {headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.T-vHdnp4DIpuFBRqFrWr42yG-4zxUmxm7z7YHJeMon8' }})

        if (!data) {
            throw NotFound('No Billing found');
        }
        const billing_worker = await mq.consumeDataBilling("billing_worker_ms_queue")
        const customer = await mq.consumeDataCustomer("customer_ms_queue")

        data.data = await concatResponses(data.data, JSON.parse(billing_worker), JSON.parse(customer))


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