const express = require('express');
const { createPaymentIntent } = require('../controllers/checkout.controller');

const router = express.Router();

router.route('/create-payment').post(createPaymentIntent);

module.exports = router;