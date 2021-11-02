const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
  customer: String,
  subscription: String,
  item: String,
  active: { type: Boolean, default: false },
  key: String,
  createdAt: Date,
  updatedAt: Date,
})

module.exports = mongoose.model('Customer', customerSchema)
