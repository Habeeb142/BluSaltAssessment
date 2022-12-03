const { BadRequest, InternalServerError, NotFound, Forbidden } = require('http-errors');
const CrudRepository = require('../src/store/crudStore');
const { validationResult } = require('express-validator');

exports.updateBillingStatus = async (req, res) => {
    try {
        const update = await new CrudRepository().updateBillingStatus(req.body, req.params.transactionId);

        if (!update) {
            throw NotFound('ERROR Updating Status');
        }
    
        return res.status(200).json({
            ...update
        });
    } catch (error) {
        return res.status(error.status || error.statusCode || 500).json({
            isSuccess: false,
            message: error.message || 'Server error',
            error
        });
    }
};