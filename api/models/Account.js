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
      size: 64,
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
      columnName: 'user_profile',
      model: 'UserProfile',
      unique: true
    },
    fromTransactions: {
      collection: 'Transaction',
      via: 'fromAccount'
    },
    toTransactions: {
      collection: 'Transaction',
      via: 'toAccount'
    },
    devices: {
      collection: 'Device',
      via: 'account'
    },
    toJSON: function toJSON () {
      var obj = this.toObject(); //eslint-disable-line
      return removePassword(obj);
    }
  },
  beforeCreate: (account, callback) => hashPassword(account, callback)
};
