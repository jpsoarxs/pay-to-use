const express = require('express');
const router = express.Router();

router.get('/stripe', function (req, res) {
  res.send('Stripe');
});

module.exports = router;