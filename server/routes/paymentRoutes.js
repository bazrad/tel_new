const express = require('express');
const router = express.Router();
const { makePayment, getPaymentHistory } = require('../controller/paymentController');

router.post('/make-payment', makePayment);
router.get('/history', getPaymentHistory);

module.exports = router; 