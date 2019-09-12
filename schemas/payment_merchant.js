'use strict'

const payment_merchant = {
  id: {
    faker: 'random.uuid'
  },
  location : {
    hasOne: 'locations'
  },
  merchant: {
    hasOne: 'merchants',
  },
  batch_terminal_number: {
    eval: 'faker.random.number({"min": 1, "max": 200}).toString().padStart(5,\'0\')'
  },
  transaction_terminal_number: {
    randexp: /[1-9]{8}/
  },
  location_id:{
    self:'location.id'
  },
  merchant_id:{
    self: 'merchant.id',
  }
}

module.exports = payment_merchant