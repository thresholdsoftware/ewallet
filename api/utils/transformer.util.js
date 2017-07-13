/* global Promise*/
import bcrypt from 'bcryptjs';
import noop from 'lodash/noop';
import find from 'lodash/find';
import each from 'lodash/each';
import map from 'lodash/map';
import filter from 'lodash/filter';

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

export const checkIfVerifiedDevice = (user, deviceId = null, deviceName = null) => {
  const foundDevice = find(user.devices, {deviceId});
  const isAdmin = (user.userProfile.userType === 'BANK_ADMIN');
  return new Promise((resolve, reject) => {
    if ((foundDevice && foundDevice.verified) || isAdmin) {
      return resolve(foundDevice);
    }
    return reject({message: 'Device not Verified', deviceId, deviceName, error: 'DEVICE_NOT_VERIFIED', phone: user.phone, countryCode: user.countryCode});
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

export const transactionListMetaGenerator = (transactionList, ownAccountId) => {
  const transformed = map(transactionList, (transactionItem) => {
    const {fromAccount, toAccount, transactionType} = transactionItem;
    switch (transactionType) {
    case 'BANK_TO_WALLET': {
      transactionItem.metadata = `Bank Transfer - BA:${fromAccount.phone} ${transactionItem.note || ''}`; break;
    }
    case 'WALLET_TO_WALLET': {
      if (fromAccount.id === ownAccountId) {
        transactionItem.metadata = `Transfer to ${toAccount.phone} ${transactionItem.note || ''}`; break;
      } else {
        transactionItem.metadata = `Transfer from (${fromAccount.phone}) ${transactionItem.note ||
        ''}`; break;
      }
    }
    }
    return transactionItem;
  });
  return transformed;
};

export const cleanArrayOfFalsy = (rawArray) => {
  const filtered = filter(rawArray, (eachElement) => !!eachElement);
  return filtered;
};
