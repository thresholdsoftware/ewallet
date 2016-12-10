module.exports = {
  attributes: {
    from_account: {
      model: 'Account',
      required: true
    },
    to_account: {
      model: 'Account',
      required: true
    },
    transaction_type: {
      type: 'string',
      enum: [
        'CREDIT', 'WALLET'
      ],
      required: true
    },
    amount: {
      type: 'integer',
      required: true
    },
    metadata: {
      type: 'string',
      required: true
    }
  }
};
