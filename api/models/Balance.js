module.exports = {
  attributes: {
    balance: {
      type: 'integer',
      required: true,
      defaultsTo: 0,
      size: 64
    },
    account: {
      model: 'Account',
      required: true
    }
  },
  afterCreate: (values, cb) => {
    const accountId = values.account;
    Account.update({
      id: accountId
    }, {balanceAccount: values.id}).then(() => {
      cb();
    }, (err) => cb(err));
  }
};
