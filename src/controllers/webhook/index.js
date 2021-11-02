const express = require('express');
const router = express.Router();

const stripe = require('stripe')('sk_test_51DwXtgEAlUVbW0n6cuaO2D0oPz7rutcx2JEcfHkW4FDeDGp7xK4jMMtLbsdeYUEiZ6MKT6zwG9VF9A78NoaGhvh500qcKp2Qte');

const stripeWebhookApp = require('./../../applications/gateway/stripe/webhook')
const { generateAPIKey } = require('./../../applications/hash')

router.post('/', async function (req, res) {
  const { status, data, event } = await stripeWebhookApp(req, res)

  if (status && event === 'checkout.session.completed') {

    const customerId = data.customer
    const subscriptionId = data.subscription

    console.log(
      `💰 Customer ${customerId} subscribed to plan ${subscriptionId}`
    );

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const itemId = subscription.items.data[0].id;

    console.log('Item ID:', itemId)

    const { apiKey, hashedAPIKey } = generateAPIKey()
    console.log(`User's API Key: ${apiKey}`);
    console.log(`Hashed API Key: ${hashedAPIKey}`);

    res.sendStatus(200);
  }
});

module.exports = router;