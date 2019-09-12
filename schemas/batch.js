'use strict'

const _ = require('lodash')
const moment = require('moment-timezone')

const asEtag = ts => `W/"datetime''${encodeURI(ts)}''"`

const batch = {
  _payment_merchant:{
    hasOne: 'payment_merchants',
    virtual: true
  },
  _authorizations:{
    hasMany: 'authorizations',
    min:100,
    max:200,
    unique: true,
    virtual: true
  },
  tz:{
    self:'_payment_merchant.location.tz'
  },
  _ts:{
    faker: 'date.past(1,"2019-03-31")',
    virtual: true
  },
  batch_date:{
    function()  {
      return moment(this.object._ts).format('Y-MM-DD')+' 00:00:00'
    }
  },
  // location_id: {
  //   self:"_payment_merchant.location_id"
  // },
  payment_merchant_id:{
    self:"_payment_merchant.merchant_id"
  },
  id:{
    faker: 'random.uuid'
  },
  source: {
    values: ['tsys','fd']
  },
  batch_id: {
    faker: 'random.number({"min":1000000, "max":10000000})'
  },
  net_deposit : {
    function() {
      const transactions = _.filter(this.object._authorizations, {is_success:true})
      const sum = _.reduce(transactions, (sum, trans) => {
        return sum + parseFloat(trans.auth_amount)
      }, 0.00)
      return sum.toFixed(2)
    }
  },
  terminal_number :{
    self:"_payment_merchant.batch_terminal_number"
  },
  etag :{
    function() {
      return asEtag(moment(this.object._ts))
    }
  },
  authorizations: {
    function() {
     return _.map(this.object._authorizations, item => {
        const copiedFromBatch = _.pick(this.object,[
          // 'location_id',
          'payment_merchant_id','terminal_number','source','batch_id',
        ])
        // auth date logically should be somewhere around batch date
        const localDT = moment(this.object.batch_date).format('Y-MM-DDT') + item.local_time
        const tzMoment = moment.tz(localDT, this.object.tz)
        const batchDependent = {
          auth_date: tzMoment.clone().utc().format('Y-MM-DD HH:mm:ss'),
          local_date: tzMoment.clone().format('Y-MM-DD'),
          etag: asEtag(moment(tzMoment.clone().utc().format()))
        }

        const transDate = tzMoment.clone().subtract(Math.random() > 0.9 ? 1 : 0, 'days').utc().format('Y-MM-DD') + ' 00:00:00'
        const transaction = _.extend({}, copiedFromBatch, _.pick(item,[
          'card_type','pan', 'is_card_present', 'cashback_amount', 'debit_credit','local_time'
        ]), {
          id: this.faker.random.uuid(),
          ext_trans_id: new this.randexp(/\d{16}/).gen(),
          trans_id: new this.randexp(/[A-Z0-9]{14}/).gen(),
          trans_date: transDate,
          terminal_number: this.object._payment_merchant.transaction_terminal_number,
          authorized_amount: item.auth_amount,
          trans_amount: (parseFloat(item.auth_amount) + parseInt((Math.random()*100)/10)).toFixed(2),
          etag: asEtag(tzMoment.clone().utc().format())
        })

        return _.assign({}, item, copiedFromBatch, batchDependent, { transaction }, { id: this.faker.random.uuid() })
      })
    }
  },
}

module.exports = batch