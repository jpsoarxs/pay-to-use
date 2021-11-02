const mongoose = require('mongoose')

async function load({ logger }) {
  try {
    const options = {
      socketTimeoutMS: 300000,
      useNewUrlParser: true,
    }

    const conn = await mongoose.connect('mongodb://localhost:27017/paytouse', options)

    logger.info(`database connected on mongodb://localhost:27017/paytouse`)

    return conn
  } catch (err) {
    logger.error(err)
  }
}

module.exports = { load }