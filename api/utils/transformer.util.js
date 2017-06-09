/* global Promise*/
import bcrypt from 'bcryptjs';

export const removePassword = (user) => {
  const {password, ...passwordRemoved} = user; //eslint-disable-line
  return passwordRemoved;
};

export const hashPassword = (ac, cb) => {
  const account = ac;
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(7, (err, salt) => {
      bcrypt.hash(account.password, salt, (error, hash) => {
        if (error) {
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

export const getTransferType = (fromAccount, toAccount) => 'WALLET_TO_WALLET';
