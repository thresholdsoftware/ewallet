const transact = (req, res) => {
  const t = {
    from_account: req.user.id,
    to_account: req.body.to_account,
    transaction_type: 'WALLET',
    amount: req.body.amount,
    metadata: `Transfer from ${req.user.id} to ${req.body.to_account}` //eslint-disable-line
  };
  return Transaction.create(t).then((u) => {
    res.status(200).json(u);
  }, (err) => {
    res.status(400).json({
      err: err.message || err
    });
  });
};

const testCreditTransaction = (req, res) => {
  const t = {
    from_account: 0,
    to_account: req.user.id,
    transaction_type: 'CREDIT',
    amount: req.body.amount,
    metadata: `CREDITED ${req.body.amount} to ${req.user.id} via scratch card ${Date.now()}`
  };
  return Transaction.create(t).then((u) => {
    res.status(200).json(u);
  }, (err) => {
    res.status(400).json({
      err: err.message || err
    });
  });
};

const getTransactions = (req, res) => {
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() - 1);
  const fromDate = new Date(req.query.from_date || defaultDate);
  const toDate = new Date(req.query.to_date || Date.now());
  const account = req.user.id;
  Transaction.find({
    where: {
      or: [
        {
          from_account: account
        }, {
          to_account: account
        }
      ],
      createdAt: {
        '>=': fromDate,
        '<=': toDate
      }
    }
  }).populate('from_account').populate('to_account').then(u => res.status(200).json(u)).catch(err => res.status(500).json(err));
};

module.exports = {
  transact,
  getTransactions,
  testCreditTransaction
};
