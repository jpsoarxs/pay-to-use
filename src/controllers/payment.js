const express = require('express');

const gatewayController = require('./gateway')
const webhookController = require('./webhook')

const router = express.Router();

router.use('/gateway', gatewayController);
router.use('/webhook', webhookController);

module.exports = router;