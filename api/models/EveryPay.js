module.exports = {
  attributes: {
    creditStatus: {
      type: 'string',
      enum: [
        'SUCCESS', 'PENDING'
      ],
      required: true
    },
    transactionId: {
      type: 'integer',
      unique: true
    },
    nonce: {
      type: 'string',
      unique: true
    },
    accountId: {
      type: 'string',
      required: true
    },
    apiUserName: {
      type: 'string',
      required: true
    },
    amount: {
      type: 'string',
      required: true
    },
    skinName: {
      type: 'string',
      required: true
    },
    timestamp: {
      type: 'string',
      required: true
    },
    transactionType: {
      type: 'string',
      required: true
    },
    userIp: {
      type: 'string',
      required: true
    },
    transaction: {
      collection: 'Transaction',
      via: 'everyPay'
    }
  }
};
