const express = require('express');
const router = express.Router();

const stripeApp = require('./../../applications/gateway/stripe')

router.get('/stripe', async function (req, res) {
  const session = await stripeApp()
  res.send(session);
});

module.exports = router;