const Customer = require('./../../database/models/customer')

const express = require('express');
const router = express.Router();

router.get('/', async function (req, res) {
  const session = await Customer.find()
  res.send(session);
});

module.exports = router;