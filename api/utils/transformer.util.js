/* global Promise*/
import bcrypt from 'bcryptjs';
import noop from 'lodash/noop';
import find from 'lodash/find';

export const removePassword = (user) => {
  const {password, ...passwordRemoved} = user; //eslint-disable-line
  return passwordRemoved;
};

export const hashPassword = (ac, next = noop) => {
  const account = ac;
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(7, (err, salt) => {
      bcrypt.hash(account.password, salt, (error, hash) => {
        if (error) {
          reject(error);
          next(error);
        } else {
          account.password = hash;
          resolve(account);
          next();
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

export const checkIfVerifiedDevice = (devices = [], deviceId = null) => {
  const foundDevice = find(devices, {deviceId});
  return new Promise((resolve, reject) => {
    if (foundDevice && foundDevice.verified) {
      return resolve(foundDevice);
    }
    return reject({message: 'Device not Verified', deviceId, code: 'DNV'});
  });
};
