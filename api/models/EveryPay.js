module.exports = {
  attributes: {
    creditStatus: {
      type: 'string',
      columnName: 'credit_status',
      enum: [
        'SUCCESS', 'PENDING'
      ],
      defaultsTo: 'PENDING',
      required: true
    },
    paymentId: {
      columnName: 'payment_id',
      type: 'string'
    },
    nonce: {
      columnName: 'nonce',
      type: 'string',
      required: true
    },
    apiAccountId: {
      columnName: 'api_account_id',
      type: 'string',
      required: true
    },
    apiUserName: {
      columnName: 'api_username',
      type: 'string',
      required: true
    },
    amount: {
      columnName: 'amount',
      type: 'string',
      required: true
    },
    skinName: {
      columnName: 'skin_name',
      type: 'string',
      required: true
    },
    transactionType: {
      columnName: 'transaction_type',
      type: 'string',
      required: true
    },
    userIp: {
      columnName: 'user_ip',
      type: 'string',
      required: true
    },
    transaction: {
      collection: 'Transaction',
      via: 'everyPay'
    },
    userId: {
      model: 'Account',
      required: true,
      columnName: 'user_id'
    }
  },
  beforeCreate: (v, cb) => {
    console.log(v, 'before');
    cb();
  },
  afterCreate: (v, cb) => {
    console.log('after', v);
    cb();
  }
};
