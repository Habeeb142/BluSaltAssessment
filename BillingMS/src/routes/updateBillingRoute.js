const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
// Import Customer Controller
const { updateBillingStatus } = require('../../controllers/updateBillingController');
// Import Authentication
const { authenticateUser } = require('../../services/authentication')

router.patch(
    '/updateBillingStatus/:transactionId',
    authenticateUser,
    body('status').isString(),
    updateBillingStatus
)

module.exports = router;