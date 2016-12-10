/**
 * UserProfile.js
 *
 * @description :: UserProdule model for managing user profile
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string'
    },
    account: {
      model: 'Account',
      required: true,
      unique: true
    },
    email: {
      type: 'email'
    }
  },
  afterCreate: (values, cb) => {
    const accountId = values.account;
    Account.update({
      id: accountId
    }, {userprofile: values.id}).then(() => {
      cb();
    }, err => cb(err));
  }
};
