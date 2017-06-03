/* global TransactionFee, sails*/
import _ from 'lodash';

const getTransactionFees = (req, res) => TransactionFee.find().then((u) => {
  if (!u) {
    return res.status(404).json({message: 'record not found'});
  }
  return res.status(200).json(u);
}, (err) => res.status(500).json(err));


const createTransactionFee = (req, res) => {
  const reqBody = _.assign({}, req.body);
  return TransactionFee.create(reqBody).then((sc) => {
    res.status(200).json(sc);
  }).catch((err) => {
    sails.log.error(err);
    res.status(500).json(err);
  });
};

const updateTransactionFee = (req, res) => {
  const reqBody = _.assign({}, req.body);
  const transactionType = req.params.transactionType;
  return TransactionFee.update({
    transactionType: transactionType
  }, {transactionFee: reqBody.transactionFee}).then((sc) => {
    res.status(200).json(sc);
  }).catch((err) => res.status(500).json(err));
};


module.exports = {
  getTransactionFees,
  createTransactionFee,
  updateTransactionFee
};
