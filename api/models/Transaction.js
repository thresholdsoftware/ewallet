module.exports = {
  attributes: {
    from_account: {
      model: 'Account',
      required: false
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
    scratch_card_id: {
      type: 'string',
      required: false
    }
  }
};
