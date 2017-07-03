import {checkIfVerifiedDevice} from '../utils/transformer.util';
import result from 'lodash/result';

module.exports = (req, res, next) => {
  const requestDeviceId = result(req,'body.deviceId', req.query.deviceId);
  return checkIfVerifiedDevice(req.user,requestDeviceId).
  then(() => next()).
  catch((err) => res.status(403).json(err));
};
