/* global TransactionFee*/

const getTransactionFees = (req, res) => {
  TransactionFee.find({}).
  then((u) => res.status(200).json(u)).
  catch((err) => res.status(500).json(err));
};

const updateTransactionFee = (req, res) => {
  const {transactionFee} = req.body;
  const {transactionType} = req.params;
  return TransactionFee.update({transactionType}, {transactionFee}).
  then((sc) => res.status(200).json(sc)).
  catch((err) => res.status(500).json(err));
};

module.exports = {
  getTransactionFees,
  updateTransactionFee
};
