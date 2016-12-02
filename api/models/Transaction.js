module.exports = {
  attributes: {
    from_phone: {
      type: 'integer',
      required: false
    },
    to_phone: {
      type: 'integer',
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
