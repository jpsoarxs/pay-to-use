const stripe = require('stripe')('sk_test_51DwXtgEAlUVbW0n6cuaO2D0oPz7rutcx2JEcfHkW4FDeDGp7xK4jMMtLbsdeYUEiZ6MKT6zwG9VF9A78NoaGhvh500qcKp2Qte');

const checkout = async () => {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: 'price_1JrOvWEAlUVbW0n6efJVONPT',
        quantity: 1
      }
    ],
    success_url:
      'http://localhost:3000/dashboard?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000/error',
  })

  return session
}

module.exports = checkout