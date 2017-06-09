const transactionTypes = require('../../config/transaction').transactionTypes;

module.exports = {
  attributes: {
    transactionType: {
      columnName: 'transaction_type',
      type: 'string',
      required: true,
      enum: transactionTypes,
      unique: true
    },
    fee: {
      columnName: 'fee',
      required: true,
      type: 'float'
    }
  }
};
