const stripe = require('stripe')('sk_test_51DwXtgEAlUVbW0n6cuaO2D0oPz7rutcx2JEcfHkW4FDeDGp7xK4jMMtLbsdeYUEiZ6MKT6zwG9VF9A78NoaGhvh500qcKp2Qte');

const webhook = async (req, res) => {
  let data;
  let eventType;
  // Check if webhook signing is configured.
  const webhookSecret = 'whsec_WA7h1mzhNEshb5D9AEecGogbuAbKGVpk';

  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers['stripe-signature'];

    try {
      event = stripe.webhooks.constructEvent(
        req['rawBody'],
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      res.sendStatus(400)
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  switch (eventType) {
    case 'checkout.session.completed':
      return { status: true, message: 'payment success.', event: eventType, data: data.object };
      break;
    case 'invoice.paid':
      return { status: true, message: 'payment success.', event: eventType, data: data.object };
      break;
    case 'invoice.payment_failed':
      return { status: false, message: 'payment failed.', event: eventType, data: data.object };
      break;
    default:
      return { status: false, message: 'event not found.', event: eventType, data: data.object };
    // Unhandled event type
  }
}

module.exports = webhook