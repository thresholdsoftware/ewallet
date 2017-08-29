/* globals sails*/
import crypto from 'crypto';
import map from 'lodash/map';
import ipware from 'ipware';

const getIpOfUser = ipware().get_ip;

const _addHmacFieldsToJSON = (inputJson) => {
  const value = Object.keys(inputJson).concat('hmac_fields').sort().join(',');
  return {...inputJson, 'hmac_fields': value};
};

const _calculateHmac = (signingKey, inputJson) => {
  const mapped = map(inputJson, (value, key) => key + '=' + value);
  const hmacText = mapped.sort().join('&');
  return crypto.createHmac('sha1', signingKey).update(hmacText).digest('hex');
};

const getFields = (amount = '20.0', orderReference = '1123', userIp = '171.48.18.104') => {
  const hmacFieldAddedJson = _addHmacFieldsToJSON({
    'account_id': 'EUR3D1',
    'amount': amount,
    'api_username': 'ae7b6dc361da034d',
    'callback_url': 'http://www.google.ee/?q=callback',
    'customer_url': 'http://www.google.ee/?q=redirect',
    'nonce': '30d7810d31dbb77d4300fd3f6a59ff11',
    'order_reference': orderReference,
    'skin_name': 'default',
    'timestamp': Date.now(),
    'transaction_type': 'charge',
    'user_ip': userIp,
  });
  return hmacFieldAddedJson;
};

const generatePaymentPage = (req, res) => {
  const signingKey = '7b001618f845683a735aa2171e71deb4';
  const everyPayUrl = 'https://igw-demo.every-pay.com/transactions';
  const {clientIp} = getIpOfUser(req);
  const {amount} = req.body;
  const orderReference = '12010';
  const fields = getFields(amount, orderReference, clientIp);
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
  res.status(200).send(html);
};

module.exports = {
  generatePaymentPage
};
