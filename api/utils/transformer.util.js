/* global Promise*/
import bcrypt from 'bcryptjs';
import noop from 'lodash/noop';
import find from 'lodash/find';
import each from 'lodash/each';

export const removePassword = (user) => {
  const {password, ...passwordRemoved} = user; //eslint-disable-line
  return passwordRemoved;
};

export const compareHashedPassword = (unencryptedPass, encryptedStorePass) => {
  const p = new Promise((resolve, reject) => {
    bcrypt.compare(unencryptedPass, encryptedStorePass, function (err, result) {
      if (!result) {
        return reject(false);
      }
      return resolve(true);
    });
  });
  return p;
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
    return reject({message: 'Device not Verified', deviceId, error: 'DEVICE_NOT_VERIFIED'});
  });
};

export const getDeviceFromDb = (devices, deviceId, deviceName, accountId) => {
  const found = find(devices, {deviceId});
  if (!found) {
    return Device.create({deviceId, deviceName, account: accountId});
  }
  return Promise.resolve(found);
};

export const checkRequiredKeys = (entity = {}, requiredKeys = []) => {
  const invalidAttributes = {};
  each(requiredKeys, (eachKey) => {
    const value = entity[eachKey];
    if (!value && ![0, false].includes(value)) {
      invalidAttributes[eachKey] = [{'value': value, 'message': 'Not a valid value'}];
    }
  });
  return (Object.keys(invalidAttributes).length > 0) ? {'error': 'CUSTOM_VALIDATION', 'summary': 'Incomplete request',
    'invalidAttributes': invalidAttributes} : null;
};
