module.exports = {
  attributes: {
    transactionType: {
      type: 'string',
      required: true
    },

    transactionFee: {
      required: true,
      type: 'float'
    }
  }
};
