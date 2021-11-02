const Customer = require('./../../database/models/customer')
const Order = require('./../../database/models/order')

const logger = require('./../../utils/logger');
const express = require('express');

const router = express.Router();

const stripe = require('stripe')('sk_test_51DwXtgEAlUVbW0n6cuaO2D0oPz7rutcx2JEcfHkW4FDeDGp7xK4jMMtLbsdeYUEiZ6MKT6zwG9VF9A78NoaGhvh500qcKp2Qte');

const stripeWebhookApp = require('./../../applications/gateway/stripe/webhook')
const { generateAPIKey } = require('./../../applications/hash')

router.post('/', async function (req, res) {
  const { status, data, event } = await stripeWebhookApp(req, res)

  if (status && event === 'checkout.session.completed') {
    console.log(data)
    const customer = data.customer
    const subscription = data.subscription

    const subscriptionFind = await stripe.subscriptions.retrieve(subscription);
    const item = subscriptionFind.items.data[0].id;

    const { apiKey } = generateAPIKey()

    await Customer.create({
      customer, subscription, item, active: true,
      key: apiKey, createdAt: new Date(), updatedAt: new Date()
    })

    await Order.create({
      transaction: data.id,
      subscriptions: data.subscription,
      amount: data.amount_total,
      subtotal: data.amount_subtotal,
      currency: data.currency,
      customer: data.customer,
      status: data.payment_status,
      createdAt: new Date(),
      updatedAt: new Date(),
      expiresAt: new Date(data.expires_at * 1000),
    })

    logger.info(`💰 Customer ${customer} subscribed to plan ${subscription}`)
    res.sendStatus(200);
  }
});

module.exports = router;