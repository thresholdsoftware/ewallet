import fetch from 'node-fetch';

const callFetch = (url, config) => {
  return new Promise((resolve, reject) => {
    return fetch(url, config).then((d) => {
      if (d.status !== 200) {
        return reject(d);
      }
      return resolve(d);
    }).catch(err => reject(err));
  });
};

const get = (url) => {
  const config = {
    method: 'GET',
    headers: {},
    compress: true,
    credentials: 'include'
  };
  return callFetch(url, config);
};

const post = (url, body) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    credentials: 'include',
    compress: true
  };
  return callFetch(url, config);
};
module.exports = {
  get,
  post
};
