const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
// Import Customer Controller
const { getAllCustomers, getCustomerByCustomerId, getCustomerByEmail } = require('../../controllers/getCustomerController');
// Import Authentication
const { authenticateUser } = require('../../services/authentication')

router.get(
    '/getAllCustomers',
    authenticateUser,
    getAllCustomers
)

router.get(
    '/getByCustomerId/:customerId',
    authenticateUser,
    getCustomerByCustomerId
)

router.get(
    '/getByEmail/:email',
    authenticateUser,
    getCustomerByEmail
)
module.exports = router;