/* globals sails*/
import SmsUtil from '../utils/sms.util';
import find from 'lodash/find';
import {getDeviceFromDb} from '../utils/transformer.util';

const sendVerificationMessage = (req, res) => {
  const {phone, countryCode} = req.body;
  return SmsUtil.sendSmsOtp(phone, countryCode).
  then((success) => res.status(200).json({status: 'SUCCESS', success})).
  catch((error) => {
    sails.log.error(error);
    return res.status(500).json(error);
  });
};

const verifyDevice = (req, res) => {
  const {code, deviceId, deviceName} = req.body;
  const {phone, countryCode, id} = req.user;
  return SmsUtil.verifySmsOTP(phone, countryCode, code).
  then(() => getDeviceFromDb(req.user.devices, deviceId, deviceName, id)).
  then((foundDevice) => Device.update({id: foundDevice.id}, {verified: true})).
  then((verifiedDevice) => res.status(200).json(verifiedDevice)).
  catch((err) => {
    sails.log.error(err);
    return res.status(500).json(err);
  });
};

const removeVerifiedDevice = (req, res) => {
  const {deviceId} = req.params;
  const registeredDevices = req.user.devices;
  const found = find(registeredDevices, {deviceId});
  if (!found) {
    return res.status(404).json({message: 'Device not found!', deviceId, error: 'DEVICE_NOT_FOUND'});
  }
  return Device.destroy({id: found.id}).
  then((removedDevice) => res.status(200).json(removedDevice)).
  catch((err) => res.status(500).json(err));
};

module.exports = {
  sendVerificationMessage,
  verifyDevice,
  removeVerifiedDevice
};
