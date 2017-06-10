/* global CreditRequest ,sails */
import _ from 'lodash';

const getCreditRequests = (req, res) => CreditRequest.find().populateAll().then((u) => {
  if (!u) {
    return res.status(404).json({message: 'record not found'});
  }
  return res.status(200).json(u);
}, (err) => res.status(500).json(err));


const createCreditRequest = (req, res) => {
  const reqBody = _.assign({}, req.body);
  return CreditRequest.create(reqBody).then((sc) => {
    res.status(200).json(sc);
  }).catch((err) => {
    sails.log.error(err);
    res.status(500).json(err);
  });
};

const updateCreditRequest = (req, res) => {
  const reqBody = _.assign({}, req.body);

  const transactionId = req.params.transactionId;

  return CreditRequest.update({
    transactionId: transactionId
  }, {creditStatus: reqBody.creditStatus}).then((sc) => {
    res.status(200).json(sc);
  }).catch((err) => res.status(500).json(err));
};


module.exports = {
  getCreditRequests,
  createCreditRequest,
  updateCreditRequest

};
