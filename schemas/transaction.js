'use strict'

const transaction = {
  'id': {
    faker: 'random.uuid'
  },
  'transaction_id':{
    randexp: '\\d{16}'
  },
  'ext_trans_id': {
    randexp: '[A-Z0-9]{14}'
  }
}

module.exports = transaction