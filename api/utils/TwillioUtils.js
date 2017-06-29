const authyKey = 'JzpgXfrLMqoEkUjBozVOmr0cBxlKJRC5';
var rp = require('request-promise');

const post = (url, requestBody, hdrs) => {
  const config = {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(requestBody),
    headers: Object.assign({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, hdrs)
  };

  return fetchData(url, config);
};

const get = (url, hdrs) => {
  const config = {
    method: 'GET',
    credentials: 'include',
    headers: Object.assign({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, hdrs)
  };
  return fetchData(url, config);
};

const fetchData = (url, config) => {
  console.log(url, config.method); // eslint-disable-line
  return rp(url, config);
};

const sendMessage = (phone_number, country_code) => {
  if (sails.config.disableTwillio) {
    console.log('Running in TWILLIO DISABLED MODE'); //eslint-disable-line
    return Promise.resolve({
      'carrier': 'Dummy',
      'is_cellphone': true,
      'message': `We have sent ${phone_number} a verification message`,
      'seconds_to_expire': 599,
      'uuid': '370650f0-3e9e-0135-ba71-0e690b363fd4',
      'success': true
    });
  }
  const twillioSendMessageUrl = 'https://api.authy.com/protected/json/phones/verification/start';
  return post(twillioSendMessageUrl, {phone_number, country_code, via: 'sms'}, {'X-Authy-API-Key': authyKey});
};

const verifyPasscode = (phone_number, country_code, verification_code) => {
  if (sails.config.disableTwillio) {
    console.log('Running in TWILLIO DISABLED MODE'); //eslint-disable-line
    return Promise.resolve({
      'message': 'Verification code is correct.',
      'success': true
    });
  }
  const verifyUrl = `https://api.authy.com/protected/json/phones/verification/check?phone_number=${phone_number}&country_code=${country_code}&verification_code=${verification_code}`;
  return get(verifyUrl, {'X-Authy-API-Key': authyKey});
};

module.exports = {
  verifyPasscode,
  sendMessage
};
