'use strict'

const _ = require('lodash')
const fs = require('fs')
const schemas = require('./schemas')
const mocker = require('mocker-data-generator').default
const squel = require('squel')

const collectionToSQL = (collection, tableName, singleQuery=true) => {
  if (singleQuery) {
    return squel
      .insert()
      .into(tableName)
      .setFieldsRows(collection)
      .toString()
  }
  return _.map(collection, row => {
    return squel
      .insert()
      .into(tableName)
      .setFieldsRows([row])
      .toString()
    }).join(';\n')
}

const toSQL = obj => {
  return _.map(obj, (val, idx) => collectionToSQL(val, idx, false)).join(';\n')
}

const BATCH_COUNT = 50

mocker()
  .schema('locations', schemas.location, { uniqueField: 'id' })
  .schema('merchants', schemas.merchant, { uniqueField: 'id' })
  .schema('payment_merchants', schemas.payment_merchant, 5)
  .schema('authorizations', schemas.authorization, BATCH_COUNT * 200)
  .schema('batches', schemas.batch, BATCH_COUNT)
  .build()
  .then(data => {
    const batches = _.map(data.batches, b => _.pick(b, [
      'id', 'location_id', 'payment_merchant_id', 'source', 'batch_id', 'batch_date', 'net_deposit', 'terminal_number', 'etag'
    ]))

    const authorizations = _.flatMap(data.batches, 'authorizations')
    const transactions = _.flatMap(_.filter(authorizations, {is_success: true}), auth => {
      return auth.transaction
    })

    const dataToWrite = {
      payment_service_batches: batches,
      payment_service_authorizations: _.map(authorizations, a => _.pickBy(a, (v,k) => !_.includes(['transaction','batch_id'], k))),
      payment_service_transactions: transactions
    }

    const fileName = 'test.data.' + require('faker').random.uuid() + '.sql'
    const asSQL = toSQL(dataToWrite)
      return fs.writeFileSync(fileName, asSQL)
  })