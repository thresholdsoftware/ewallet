const getBalance = (req, res) => {
  const phone = req.user.phone;
  return Balance.findOne({phone}).populateAll().then((u) => {
    if (!u) {
      return res.status(404).json({message: 'record not found'});
    }
    return res.status(200).json(u);
  })
  .catch(err => res.status(500).json(err));
};

module.exports = {
  getBalance
};
