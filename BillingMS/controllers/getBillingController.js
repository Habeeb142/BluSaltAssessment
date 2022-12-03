const { NotFound } = require('http-errors');
const CrudRepository = require('../src/store/crudStore');

exports.getAllBillings = async (req, res) => {
    try {

        const data = await new CrudRepository().getAllBillings();
        if (!data) {
            throw NotFound('No Billing found');
        }

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
        if (!data) {
            throw NotFound('No Billing found');
        }

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
        if (!data) {
            throw NotFound('No Bulling found');
        }

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