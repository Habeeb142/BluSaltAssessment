const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
// Import Order Controller
const { createBillingWorker } = require('../../controllers/createBillingWorkerController');
// Import Authentication
const { authenticateUser } = require('../../services/authentication')

router.post(
    '/', 
    authenticateUser, 
    body('transactionId').isString({min: 1}),
    body('transactionReference').isString({min: 1}),
    body('bankName').isString({min: 1}),
    body('bankAccountNumber').isString({min: 1}),
    createBillingWorker
);

module.exports = router;
