/**
 * Bank.js
 *
 * @description :: Bank model for managing user bank details
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    bankAccountNo: {
      type: 'string',
      required: true,
      unique:true
    },
    bank: {
      type: 'string',
      required: true,
    },
    status: {
      type: 'string',
      enum: [
        'approved', 'pending'
      ],
      defaultsTo: 'pending'
    },
    ewalletAccount: {
      model: 'Account',
      required: true
    }
  },
  afterCreate: (values, cb) => {
    const accountId = values.ewalletAccount;
    Account.update({
      id: accountId
    }, {bank: values.id}).then(() => {
      cb();
    }, err => cb(err));
  }
};
