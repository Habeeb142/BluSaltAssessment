const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
// Import Customer Controller
const { updateActivationStatus } = require('../../controllers/updateCustomerController');
// Import Authentication
const { authenticateUser } = require('../../services/authentication')

router.patch(
    '/updateActivationStatus/:customerId',
    authenticateUser,
    body('activationStatus').isNumeric(),
    updateActivationStatus
)

module.exports = router;