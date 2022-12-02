const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
// Import Order Controller
const { createCustomer } = require('../../controllers/createCustomerController');
// Import Authentication
const { authenticateUser } = require('../../services/authentication')

router.post(
    '/', 
    authenticateUser, 
    body('customerFirstName').isString({min: 1}),
    body('customerLastName').isString({min: 1}),
    body('customerEmail').isEmail({min: 1}),
    body('customerAge').isNumeric(),
    body('customerSex').isString({min: 1}),
    createCustomer
);

module.exports = router;


