import _ from 'lodash';

const getTransactionFees = (req, res) => {
  return TransactionFee.find().then((u) => {
    if (!u) {
      return res.status(404).json({message: 'record not found'});
    }
    return res.status(200).json(u);
  }, (err) => {
    return res.status(500).json(err);
  });
};


const createTransactionFee = (req, res) => {
  const reqBody = _.assign({}, req.body)
  return TransactionFee.create(reqBody).then((sc) => {
    res.status(200).json(sc);
  }).catch((err) => {
    console.log(err);
    sails.log.error(err);
    res.status(500).json(err);});
};

const updateTransactionFee = (req, res) => {
  const reqBody = _.assign({}, req.body)

  const transactionType = req.params.transactionType;
 console.log("transactionType ===="+transactionType);
 sails.log.info("test this transaction ++++++");
  return TransactionFee.update({
    transactionType: transactionType
  }, {transactionFee: reqBody.transactionFee}).then((sc) => {
    res.status(200).json(sc);
  }).catch(err => res.status(500).json(err));
};


module.exports = {
  getTransactionFees,
  createTransactionFee,
  updateTransactionFee

};


