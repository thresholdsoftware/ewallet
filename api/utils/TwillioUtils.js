
const authyKey = 'JzpgXfrLMqoEkUjBozVOmr0cBxlKJRC5';
 var request = require('request');
 var rp = require('request-promise');



const post = (path, requestBody, hdrs, disableUrl) => {
  const url = (disableUrl)
    ? path
    : (localUrl + path);

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


const get = (path, hdrs, disableUrl) => {
  const url = (disableUrl)
    ? path
    : (localUrl + path);
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
  console.log(url,config.method);
  return rp(url, config).then((r) => {
    return r;}
     ).catch((error)=>{ throw error });
};

const sendMessage = (requestBody) => {
  const twillioSendMessageUrl = 'https://api.authy.com/protected/json/phones/verification/start';
  return post(twillioSendMessageUrl, requestBody, {
    'X-Authy-API-Key': authyKey
  }, true);
};

const verifyPasscode = (phone_number, country_code, verification_code) => {
  const verifyUrl = `https://api.authy.com/protected/json/phones/verification/check?phone_number=${phone_number}&country_code=${country_code}&verification_code=${verification_code}`;
  return get(verifyUrl, {
    'X-Authy-API-Key': authyKey
  }, true);
};




module.exports = {
  verifyPasscode,
  sendMessage
};
