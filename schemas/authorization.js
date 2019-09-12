'use strict'

const moment = require('moment-timezone')
const _ = require('lodash')

const dictionaries = {
  authorization_response_codes: {
    // '00': 'Successful approval/completion',
    '01': 'Refer to card Issuer',
    '02': 'Refer to card Issuer, special condition',
    '03': 'Invalid merchant or service provider',
    '04': 'Pick up card',
    '05': 'Do not honor',
    '06': 'Error',
    '07': 'Pick up card, special condition (other than lost/stolen card)',
    // '08': 'Honor with ID (Mastercard specific)',
    '10': 'Partial Authorization',
    '12': 'Invalid transaction',
    '13': 'Invalid amount',
    '14': 'Invalid account number (no such number)',
    '15': 'No such Issuer',
    '19': 'Re-enter transaction',
    '21': 'No action taken (unable to back out prior transaction)',
    '25': 'Unable to locate record in file, or account number is missing from the inquiry',
    '28': 'File is temporarily unavailable',
    // '30': 'Format Error - Decline (Mastercard specific)',
    '34': 'Mastercard use only , Suspect Fraud (Used in reversal requests only)',
    // '39': 'No credit account (Visa ePay)',
    '41': 'Pick up card (lost card)',
    '43': 'Pick up card (stolen card)',
    '51': 'Insufficient funds',
    '52': 'No checking account',
    '53': 'No savings account',
    '54': 'Expired card',
    '55': 'Incorrect PIN',
    '57': 'Transaction not permitted to cardholder',
    '58': 'Transaction not allowed at terminal',
    '59': 'Transaction not allowed at merchant',
    '61': 'Exceeds withdrawal amount limit (activity amount limit exceeded)',
    '62': 'Restricted card (invalid in region or country)',
    '63': 'Security violation (source is not correct issuer)',
    '65': 'Activity count limit exceeded',
    '75': 'Allowable number of PIN-entry tries exceeded',
    // '76': 'Reversal: Unable to locate previous message (no match on Retrieval Reference number)',
    // '77': 'Previous message located for a repeat or reversal, but repeat or reversal data are inconsistent with original message',
    // '78': 'Invalid/nonexistent account - Decline (Mastercard specific)',
    // '79': 'Already reversed (by Switch)',
    // '80': 'No financial Impact (Reversal for declined debit)',
    // '81': 'PIN cryptographic error found (error found by the Visa security module during PIN decryption)',
    '82': 'Incorrect CVV',
    '83': 'Unable to verify PIN',
    // '84': 'Invalid Authorization Life Cycle - Decline (Mastercard), Duplicate Transaction Detected (Visa)',
    '85': 'No reason to decline a request for account number verification or address verification',
    '86': 'Cannot verify PIN',
    '91': 'Issuer unavailable or switch inoperative (STIP not applicable or available for this transaction)',
    '92': 'Destination cannot be found for routing',
    '93': 'Transaction cannot be completed; violation of law',
    // '94': 'Duplicate Transmission Detected (Integrated Debit and Mastercard)',
    '96': 'System malfunction',
    // 'B1': 'Surcharge amount not permitted on Visa cards or EBT Food Stamps',
    'B2': 'Surcharge amount not supported by debit network issuer',
    'CV': 'Card type verification error',
    'EC': 'CID verification error',
    'N0': 'Force STIP',
    'N3': 'Cash service not available',
    'N4': 'Cash request exceeds Issuer limit',
    'N5': 'Ineligible for re-submission',
    'N7': 'Decline for CVV2 failure',
    'N8': 'Transaction amount exceeds preauthorized approval amount',
    'P2': 'Invalid biller Information',
    'R0': 'The transaction was declined or returned because the cardholder requested that payment of a specific recurring or installment payment transaction be stopped.',
    'R1': 'The transaction was declined or returned because the cardholder has requested that payment of all recurring or installment payment transactions for a specific merchant account be stopped.',
    'Q1': 'Card Authentication failed',
    'V1': 'Daily Threshold Exceeded',
    'XA': 'Forward to Issuer',
    'XD': 'Forward to Issuer'
  }
}


const authorization = {
  'id': {
    faker: 'random.uuid'
  },
  card_type: {
    values: ['mc', 'visa', 'amex', 'discover', 'jcb', 'paypal', 'other']
  },
  pan: {
    randexp: /\d{4}x{9}\d{4}/
  },
  auth_id: {
    randexp: '\\d{16}'
  },
  auth_amount: {
    eval: 'faker.finance.amount(10,100)'
  },
  approval_code: {
    randexp: /[0-9A-F]{6}/
  },
  is_success: {
    eval: "Math.random() > 0.98 ? false : true"
  },
  is_card_present: {
    eval: "Math.random() > 0.999 ? false : true"
  },
  'object["is_success"]===true,auth_reject_reason': {
    static: 'Successful approval/completion'
  },
  'object["is_success"]===false,auth_reject_reason': {
    function () {
      return _.sample(dictionaries.authorization_response_codes)
    }
  },
  cashback_amount: {
    static: '0.00'
  },
  is_reversal: {
    static: false
  },
  debit_credit: {
    values: ['debit', 'credit']
  },
  local_time: {
    function () {
      const randomDate = this.faker.date.recent()
      return moment(randomDate).format('HH:mm:ss')
    }
  }
}

module.exports = authorization