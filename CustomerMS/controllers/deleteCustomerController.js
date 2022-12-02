const { BadRequest, InternalServerError, NotFound, Forbidden } = require('http-errors');
const CrudRepository = require('../src/store/crudStore');
const { validationResult } = require('express-validator');

exports.deleteCustomer = async (req, res) => {
    try {

        const customer = await new CrudRepository().deleteCustomer(req.params.customerId);
        if (!customer) {
            throw NotFound('No Customer found');
        }

        return res.status(200).json({
            isSuccess: true,
            message: 'Customer Deleted Successfully'
        });
    } catch (error) {
        return res.status(error.status || error.statusCode || 500).json({
            isSuccess: false,
            message: error.message || 'Server error',
            error
        });
    }
};
