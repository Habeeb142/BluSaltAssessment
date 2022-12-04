const { NotFound } = require('http-errors');
const CrudRepository = require('../src/store/crudStore');
const mq = require('../config/messageQueue')

exports.getAllCustomers = async (req, res) => {
    try {

        const data = await new CrudRepository().getAllCustomers();
        if (!data) {
            throw NotFound('No Customer found');
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

exports.getCustomerByCustomerId = async (req, res) => {
    try {

        const data = await new CrudRepository().getCustomerByCustomerId(req.params.customerId);
        if (!data) {
            throw NotFound('No Customer found');
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

exports.getCustomerByEmail = async (req, res) => {
    try {

        const data = await new CrudRepository().getCustomerByEmail(req.params.email);
        if (!data) {
            throw NotFound('No Customer found');
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