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
          cb();
        } else {
          account.password = hash;
          resolve(account);
          cb();
        }
      });
    });
  });
};

export const hashUpdatePassword = (ac, cb) => {
  const newPass = ac;
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(7, (err, salt) => {
      bcrypt.hash(newPass.password, salt, (error, hash) => {
        if (error) {
          reject(error);
          cb();
        } else {
          newPass.password = hash;
          resolve(newPass);
          cb(newPass);
        }
      });
    });
  });
};



export const getTransferType = (fromAccount, toAccount) => 'WALLET_TO_WALLET'; //eslint-disable-line

export const getTotalAmount = (amount, feeRate) => {
  const fee = ((feeRate / 100.0) * amount);
  return amount + fee;
};
