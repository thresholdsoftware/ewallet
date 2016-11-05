/**
 * User.js
 *
 * @description :: User model for managing user profile
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
import bcrypt from 'bcrypt';

import {setup} from '../services/Logger';

const logger = setup('User');

module.exports = {
  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    toJSON: function() { //eslint-disable-line
      let obj = this.toObject(); //eslint-disable-line
      delete obj.password;
      return obj;
    }
  },
  beforeCreate: (user, cb) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) {
          logger.error(error);
          cb(error);
        } else {
          Object.assign(user, {password: hash});
          cb();
        }
      });
    });
  }
};
