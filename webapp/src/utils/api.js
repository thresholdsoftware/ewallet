import fetch from 'node-fetch';
const serverURL = 'http://localhost:1337'

const LOGIN_API = serverURL + '/login';
const LOGOUT_API = serverURL + '/logout';
const USER_API = serverURL + '/user';
const CREDIT_REQUESTS_API = serverURL + '/creditRequests';
const CREDIT_APPROVAL_API = serverURL + '/updateCreditRequest/';
const UPDATE_TRANSACTION_FEE_API = serverURL + '/updateTransactionFee/';
const GET_TRANSACTION_FEE_API = serverURL + '/transactionFees';
const GET_TRANSACTION_COUNT_API = serverURL + '/getTransactionsCount';
const GET_ALL_TRANSACTION_API = serverURL + '/getAllTransactions';

const callFetch = (url, config) => new Promise((resolve, reject) => fetch(url, config).then((d) => {
  if (d.status !== 200) {
    return reject(d);
  }
  return resolve(d);
}).catch((err) => reject(err)));

const get = (url, querystring) => {
  const config = {
    method: 'GET',
    headers: {},
    compress: true,
    credentials: 'include',
    qs : querystring,
  };
  return callFetch(url, config);
};

const put = (url, body) => {
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    credentials: 'include',
    compress: true
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
  LOGIN_API,
  LOGOUT_API,
  USER_API,
  CREDIT_REQUESTS_API,
  CREDIT_APPROVAL_API,
  UPDATE_TRANSACTION_FEE_API,
  GET_TRANSACTION_FEE_API,
  GET_TRANSACTION_COUNT_API,
  GET_ALL_TRANSACTION_API,
  get,
  put,
  post
};
