const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
// Import Customer Controller
const { deleteCustomer } = require('../../controllers/deleteCustomerController');
// Import Authentication
const { authenticateUser } = require('../../services/authentication')

router.delete(
    '/:customerId',
    authenticateUser,
    deleteCustomer
);

module.exports = router;
