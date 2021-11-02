const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  transaction: String,
  subscriptions: String,
  amount: Number,
  subtotal: Number,
  currency: String,
  customer: String,
  status: String,
  createdAt: Date,
  updatedAt: Date,
  expiresAt: Date,
})

module.exports = mongoose.model('Order', orderSchema)
