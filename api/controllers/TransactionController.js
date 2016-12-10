const transact = (req, res) => {
  return Transaction.create(req.body).then((u) => {
    res.status(200).json(u);
  }, (err) => {
    res.status(400).json({
      err: err.message || err
    });
  });
};

const getTransactions = (req, res) => {
  const fromAccount = req.query.from_account;
  const toAccount = req.query.to_account;
  const fromDate = req.query.from_date || new Date();
  const toDate = req.query.to_date || new Date();

  if (fromAccount) {
    return Transaction.find({
      from_account: fromAccount,
      createdAt: {
        '>=': new Date(fromDate).toISOString(),
        '<=': new Date(toDate).toISOString()
      }
    }).then((u) => {
      return res.status(200).json(u);
    }).catch((err) => {
      return res.status(500).json(err);
    });
  }
  return Transaction.find({
    to_account: toAccount,
    createdAt: {
      '>=': new Date(fromDate).toISOString(),
      '<=': new Date(toDate).toISOString()
    }
  }).then((u) => {
    return res.status(200).json(u);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

module.exports = {
  transact,
  getTransactions
};
