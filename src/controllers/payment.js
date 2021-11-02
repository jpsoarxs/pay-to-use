const express = require('express');

const gatewayController = require('./gateway')

const router = express.Router();

router.use('/gateway', gatewayController);

module.exports = router;