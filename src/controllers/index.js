const express = require('express');

const customerController = require('./customer')
const middleware = require('./../middlewares/authenticate')

const router = express.Router();

router.use('/customer', middleware, customerController);

module.exports = router;