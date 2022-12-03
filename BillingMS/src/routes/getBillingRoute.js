const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
// Import Billings Controller
const { getAllBillings, getBillingByTransactionId, getBillingByCustomerId } = require('../../controllers/getBillingController');
// Import Authentication
const { authenticateUser } = require('../../services/authentication')

router.get(
    '/getAllBillings',
    authenticateUser,
    getAllBillings
)

router.get(
    '/getBillingByTransactionId/:transactionId',
    authenticateUser,
    getBillingByTransactionId
)

router.get(
    '/getBillingByCustomerId/:customerId',
    authenticateUser,
    getBillingByCustomerId
)

module.exports = router;