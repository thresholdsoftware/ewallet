module.exports = {
  attributes: {
    balance: {
      type: 'integer',
      required: true,
      defaultsTo: 0,
      size: 64
    },
    account: {
      model: 'Account'
    }
  }
};
