import {checkIfVerifiedDevice} from '../utils/transformer.util';
import result from 'lodash/result';

module.exports = (req, res, next) => {
  const devices = req.user.devices;
  const requestDeviceId = result(req,'body.deviceId', req.query.deviceId);
  return checkIfVerifiedDevice(devices,requestDeviceId).
  then(() => next()).
  catch((err) => res.status(403).json(err));
};
