/* globals sails*/
import crypto from 'crypto';
import map from 'lodash/map';
import result from 'lodash/result';
import {getTotalAmount} from '../utils/transformer.util';

const redirectUrl = 'http://www.atulr.com/test.html';
const callbackUrl = 'http://005141d2.ngrok.io/every-pay-acknowledge';

const _addHmacFieldsToJSON = (inputJson) => {
  const value = Object.keys(inputJson).concat('hmac_fields').sort().join(',');
  return {...inputJson, 'hmac_fields': value};
};

const _calculateHmac = (signingKey, inputJson) => {
  const mapped = map(inputJson, (value, key) => key + '=' + value);
  const hmacText = mapped.sort().join('&');
  return crypto.createHmac('sha1', signingKey).update(hmacText).digest('hex');
};

const _getFields = (everypayOrder) => {
  const {id, nonce, apiAccountId, apiUserName,
    amount, skinName, transactionType, userIp, createdAt, userId} = everypayOrder;
  const orderTime = new Date(createdAt);
  const hmacFieldAddedJson = _addHmacFieldsToJSON({
    'account_id': apiAccountId,
    'amount': amount,
    'api_username': apiUserName,
    'callback_url': callbackUrl,
    'customer_url': redirectUrl,
    'nonce': nonce,
    'order_reference': `${id}_${userId}`,
    'skin_name': skinName,
    'timestamp': orderTime.getTime(),
    'transaction_type': transactionType,
    'user_ip': userIp,
  });
  return hmacFieldAddedJson;
};

const _createNewEveryPayOrder = (apiUserName, apiAccountId, nonce, amount, transactionType, userIp, userId) => {
  const newOrder = {
    nonce,
    apiAccountId,
    apiUserName,
    amount,
    skinName: 'default',
    transactionType,
    userIp,
    userId
  };
  return EveryPay.create(newOrder);
};

const generatePaymentPage = (req, res) => {
  const signingKey = '7b001618f845683a735aa2171e71deb4';
  const everyPayUrl = 'https://igw-demo.every-pay.com/transactions';
  const clientIp = req.userIpAddress;
  const {amount} = req.body;
  const apiAccountId = 'EUR3D1';
  const apiUserName = 'ae7b6dc361da034d';
  const transactionType = 'charge';
  const nonce = '30d7810d31dbb77d4300fd3f6a59ff11';
  const userId = result(req, 'user.id', -1);

  return _createNewEveryPayOrder(apiUserName, apiAccountId, nonce, amount, transactionType, clientIp, userId).
  then((everypayOrder) => {
    const fields = _getFields(everypayOrder);
    const hmac = _calculateHmac(signingKey, fields);
    const html = `
    <iframe id="iframe-payment-container" name="iframe-payment-container" , width="400" , height="400"></iframe>
    <form action="${everyPayUrl}" id="iframe_form" method="post" style="display: none" target="iframe-payment-container">
      <input name="hmac" value="${hmac}" />
      ${
        map(fields, (value, key) => `<input name="${key}" value="${value}" />`).join('\n')
       }
    </form>
    <script>
      window.onload = function() {
        document.getElementById("iframe_form").submit();
      }
    </script>
    `;
    return res.status(200).json({
      orderRef: everypayOrder.id,
      html,
      redirectUrl
    });
  }).catch((err) => res.status(500).json(err));
};

const acknowledgePayment = (req, res) => {
  const orderRef = result(req, 'body.order_reference');
  const meta = orderRef.split('_');
  const everyPayId = meta[0];
  const toAccount = meta[1];
  const amountInEuros = result(req, 'body.amount');
  const paymentAdmin = req.paymentAdminUser;
  const amount = amountInEuros * 24500;
  const fee = 0;
  return Transaction.create({
    everyPay: everyPayId,
    fromAccount: paymentAdmin.account,
    toAccount,
    transactionType: 'PAYMENTADMIN_TO_WALLET',
    note: '',
    amount,
    fee,
    totalAmount: getTotalAmount(amount, fee)
  }).then((transaction) => {
    res.status(200).json(transaction);
  }).catch((err) => {
    // Check if transaction already exists
    // If existss - reply 200
    Transaction.findOne({everyPay: orderRef}).
    then((foundTransaction) => {
      if (!foundTransaction) {
        throw err;
      }
      return res.status(200).json('Already paid');
    }).
    catch((err) => res.status(500).json(err));
  });
};

module.exports = {
  generatePaymentPage,
  acknowledgePayment
};
