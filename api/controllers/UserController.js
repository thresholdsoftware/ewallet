import {hashPassword, compareHashedPassword, getDeviceFromDb, checkRequiredKeys} from '../utils/transformer.util';
import SmsUtil from '../utils/sms.util';

const signup = (req, res) => {
  const {phone, countryCode, password, name, email, code, deviceId, deviceName} = req.body;
  const errors = checkRequiredKeys(req.body, ['phone', 'countryCode', 'password', 'name', 'code', 'deviceId', 'deviceName']);
  if (errors) {
    return res.status(400).json(errors);
  }
  return SmsUtil.verifySmsOTP(phone, countryCode, code).
  then(() => Account.create({phone, password, countryCode})).
  then((acc) => UserProfile.create({name, email, account: acc.id})).
  then((uprofile) => Balance.create({account: uprofile.account, balance: 0})).
  then((balance) => Device.create({deviceId, deviceName, account: balance.account, verified: true})).
  then((device) => res.status(200).json(device)).
  catch((err) => res.status(400).json(err));
};

const getUser = (req, res) => res.status(200).json(req.user);

const updateUserProfile = (req, res) => {
  const userId = req.user.id;
  const userDetails = {...req.body, account: userId};
  return UserProfile.update({account: userId}, userDetails).
  then((updated) => {
    if (!updated[0]) {
      return UserProfile.create({...userDetails, account: userId});
    }
    return updated[0];
  }).
  then((up) => res.status(200).json(up)).
  catch((err) => res.status(500).json(err));
};


const sendPasswordResetVerificationMessage = (req, res) => {
  const {phone} = req.body;
  return Account.findOne({phone}).
  then((acc) => SmsUtil.sendSmsOtp(acc.phone, acc.countryCode)).
  then((success) => res.status(200).json({status: 'SUCCESS', success})).
  catch((error) => {
    sails.log.error(error);
    return res.status(500).json(error);
  });
};

const passwordReset = (req, res) => {
  const {phone, code, password, deviceId, deviceName} = req.body;
  let devices = [];
  return Account.findOne({phone}).populate('devices').
  then((acc) => {
    SmsUtil.verifySmsOTP(acc.phone, acc.countryCode, code);
    devices = acc.devices || [];
  }).
  then(() => hashPassword({password})).
  then(({password}) => Account.update({phone}, {password})).
  then(([account]) => getDeviceFromDb(devices, deviceId, deviceName, account.id)).
  then((foundDevice) => Device.update({id: foundDevice.id}, {verified: true})).
  then(([updatedDevice]) => res.status(200).json(updatedDevice)).
  catch((err) => res.status(500).json(err));
};

const changePassword = (req, res) => {
  const {newPassword, password} = req.body;
  return compareHashedPassword(password, req.user.password).
  catch(() => {
    throw {message: 'Incorrect current password'};
  }).
  then(() => hashPassword({password: newPassword})).
  then(({password}) => Account.update({id: req.user.id}, {password})).
  then((acc) => res.status(200).json(acc)).
  catch((err) => res.status(500).json(err));
};

const deactivateAccount = (req, res) => Account.update({id: req.user.id}, {status: 'inactive'}).
then((u) => res.status(200).json(u)).
catch((err) => res.status(500).json(err));


module.exports = {
  signup,
  getUser,
  updateUserProfile,
  sendPasswordResetVerificationMessage,
  passwordReset,
  deactivateAccount,
  changePassword
};
