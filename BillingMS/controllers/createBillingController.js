const { InternalServerError } = require('http-errors');
const CrudRepository = require('../src/store/crudStore');
const { validationResult, Result } = require('express-validator');

exports.createBilling = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() });
            }
            const data = {
                ...req.body
            };
            
            const result = await new CrudRepository().createBilling(data);
         
            if (!result) {
                throw InternalServerError('Error Creating billing');
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