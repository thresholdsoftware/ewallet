const transactionTypes = require('../../config/transaction').transactionTypes;

module.exports = {
  attributes: {
    fromAccount: {
      columnName: 'from_account',
      model: 'Account',
      required: true
    },
    toAccount: {
      columnName: 'to_account',
      model: 'Account',
      required: true
    },
    transactionType: {
      columnName: 'transaction_type',
      type: 'string',
      enum: transactionTypes,
      required: true
    },
    amount: {
      columnName: 'amount',
      type: 'integer',
      required: true
    },
    fee: {
      columnName: 'transaction_fee',
      type: 'float',
      required: true
    },
    note: {
      columnName: 'note',
      type: 'string'
    }
  }
};
