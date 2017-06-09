/**
 * UserProfile.js
 *
 * @description :: UserProdule model for managing user profile
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      columnName: 'name',
      type: 'string'
    },
    account: {
      columnName: 'account',
      model: 'Account',
      required: true,
      unique: true
    },
    email: {
      columnName: 'email',
      type: 'email'
    },
    userType: {
      columnName: 'user_type',
      type: 'string',
      enum: ['REGULAR', 'DISTRIBUTOR', 'BANK_ADMIN'],
      defaultsTo: 'REGULAR'
    }
  },
  afterCreate: (values, cb) => {
    const accountId = values.account;
    Account.update({
      id: accountId
    }, {userprofile: values.id}).then(() => {
      cb();
    }, (err) => cb(err));
  }
};
