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
      required: true
    },
    bank: {
      type: 'string',
      required: true
    },
    ewalletAccount: {
      model: 'Account',
      required: true,
      unique: true
    }
  }
};
