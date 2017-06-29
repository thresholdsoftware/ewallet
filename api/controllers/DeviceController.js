/* globals sails*/
import TwillioAPI from '../utils/TwillioUtils';
import find from 'lodash/find';

const sendVerificationMessage = (req, res) => {
  const {phone, countryCode} = req.user;
  return TwillioAPI.sendMessage(phone, countryCode).
  then((success) => res.status(200).json({status: 'SUCCESS', success})).
  catch((error) => {
    sails.log.error(error);
    return res.status(500).json(error);
  });
};

const _getDevice = (devices, deviceId, deviceName, accountId) => {
  const found = find(devices, {deviceId});
  if (!found) {
    return Device.create({deviceId, deviceName, account: accountId});
  }
  return Promise.resolve(found);
};

const verifyDevice = (req, res) => {
  const {code, deviceId, deviceName} = req.body;
  const {phone, countryCode, id} = req.user;
  return TwillioAPI.verifyPasscode(phone, countryCode, code).
  then(() => _getDevice(req.user.devices, deviceId, deviceName, id)).
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
    return res.status(401).json({message: 'Device not found!', deviceId, code: 'DNF'});
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
