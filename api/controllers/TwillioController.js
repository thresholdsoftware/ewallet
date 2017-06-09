/* globals sails*/
import _ from 'lodash';
import TwillioAPI from '../utils/TwillioUtils';

const sendVerificationMessage = (req, res) => {
  const reqBody = _.assign({}, req.body);
  const responseMessage = {};

  TwillioAPI.sendMessage(reqBody).then(() => {
    responseMessage.status = 'SUCCESS';
    return res.status(200).json(responseMessage);
  }, (error) => {
    sails.log.error(error);
    return res.status(500).json(error);
  });
};

const verifyMessage = (req, res) => {
  const reqBody = _.assign({}, req.body);
  const responseMessage = {};
  TwillioAPI.verifyPasscode(reqBody.phone, reqBody.countryCode, reqBody.code)
  .then(() => {
    responseMessage.status = 'Verification Success!!';
    return res.status(200).json(responseMessage);
  })
  .catch((err) => {
    sails.log.error(err);
    return res.status(500).json(err);
  });
};

module.exports = {
  sendVerificationMessage,
  verifyMessage
};
