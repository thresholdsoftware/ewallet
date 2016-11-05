/**
 * UserProfile.js
 *
 * @description :: UserProdule model for managing user profile
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    account: {
      model: 'Account',
      required: true
    },
    email: {
      type: 'email'
    }
  }
};
