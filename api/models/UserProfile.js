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
      enum: ['REGULAR', 'DISTRIBUTOR', 'BANK_ADMIN'],
      type: 'string',
      defaultsTo: 'REGULAR'
    }
  },
  afterCreate: (values, cb) => {
    const accountId = values.account;
    Account.update({id: accountId}, {userProfile: values.id}).
    then(() => cb()).
    catch((err) => cb(err));
  }
};
