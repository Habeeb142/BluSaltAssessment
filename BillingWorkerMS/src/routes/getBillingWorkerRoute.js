const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
// Import Billings Controller
const { getBillingWorkerByTransactionId, getAllBillingWorker } = require('../../controllers/getBillingWorkerController');
// Import Authentication
const { authenticateUser } = require('../../services/authentication')


router.get(
    '/getBillingWorkerByTransactionId/:transactionId',
    authenticateUser,
    getBillingWorkerByTransactionId
)

router.get(
    '/getAllBillingWorker',
    authenticateUser,
    getAllBillingWorker
)

module.exports = router;