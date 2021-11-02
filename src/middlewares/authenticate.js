const Customer = require('./../database/models/customer')
const logger = require('./../utils/logger')

const validate = async (req, res, next) => {
  const b64auth = req.headers.authorization || ''
  const [customerId, key] = Buffer.from(b64auth, 'base64').toString().split(':')

  const customer = await Customer.findOne({ customer: customerId, key }).lean()

  if (customer) {
    if (customer.active) { req.user = customer; return next() }

    logger.info(`⚠️ license user ${customer.customer} expired`)
  }

  res.set('WWW-Authenticate', 'Basic realm="401"')
  res.status(401).send('Authentication required.')
}

module.exports = validate;