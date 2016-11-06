/**
 * User.js
 *
 * @description :: User model for managing user profile
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
import bcrypt from 'bcrypt';

import {setup} from '../services/Logger';

const logger = setup('User');

const removePassword = (obj) => {
  let tempObj = obj; //eslint-disable-line
  delete tempObj.password;
  return tempObj;
};

const hashPassword = (ac, cb) => {
  const account = ac;
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(7, (err, salt) => {
      bcrypt.hash(account.password, salt, (error, hash) => {
        if (error) {
          logger.error(error);
          reject(error);
          cb(error);
        } else {
          account.password = hash;
          resolve(account);
          cb();
        }
      });
    });
  });
};

module.exports = {
  testExports: {
    removePassword,
    hashPassword
  },
  attributes: {
    phone: {
      type: 'string',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    status: {
      type: 'string',
      enum: [
        'active', 'inactive'
      ],
      defaultsTo: 'active'
    },
    userprofile: {
      model: 'UserProfile'
    },
    bank: {
      model: 'Bank'
    },
    toJSON: function toJSON() {
      var obj = this.toObject(); //eslint-disable-line
      return removePassword(obj);
    }
  },
  beforeCreate: (ac, cb) => hashPassword(ac, cb)
};
