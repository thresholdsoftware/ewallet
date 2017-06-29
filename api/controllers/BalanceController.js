const getBalance = (req, res) => res.status(200).json(req.user.balanceAccount);

module.exports = {
  getBalance
};
