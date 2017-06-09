/**
 * User.js
 *
 * @description :: User model for managing user profile
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

import {removePassword, hashPassword} from '../utils/transformer.util';

module.exports = {
  attributes: {
    phone: {
      columnName: 'phone',
      type: 'integer',
      unique: true,
      required: true
    },
    countryCode: {
      columnName: 'country_code',
      type: 'string'
    },
    password: {
      columnName: 'password',
      type: 'string',
      minLength: 6,
      required: true
    },
    status: {
      columnName: 'status',
      type: 'string',
      enum: [
        'active', 'inactive'
      ],
      defaultsTo: 'active'
    },
    balanceAccount: {
      columnName: 'balance',
      model: 'Balance',
      unique: true
    },
    userProfile: {
      column: 'user_profile',
      model: 'UserProfile',
      unique: true
    },
    fromTransactions: {
      column: 'from_transactions',
      collection: 'Transaction',
      via: 'fromAccount'
    },
    toTransactions: {
      column: 'to_transactions',
      collection: 'Transaction',
      via: 'toAccount'
    },
    toJSON: function toJSON () {
      var obj = this.toObject(); //eslint-disable-line
      return removePassword(obj);
    }
  },
  beforeCreate: (account, callback) => hashPassword(account, callback)
};
