const transact = (req, res) => {
  return Transaction.create(req.body).then((u) => {
    res.status(200).json(u);
  }, (err) => {
    res.status(400).json({
      err: err.message || err
    });
  });
};

module.exports = {
  transact
};
