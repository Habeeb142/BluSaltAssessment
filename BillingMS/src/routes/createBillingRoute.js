const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
// Import Order Controller
const { createBilling } = require('../../controllers/createBillingController');
// Import Authentication
const { authenticateUser } = require('../../services/authentication')

router.post(
    '/', 
    authenticateUser, 
    body('customerId').isString({min: 1}),
    body('transactionAmount').isNumeric({min: 1}),
    createBilling
);

module.exports = router;
