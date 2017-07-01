const getBalance = (req, res) => {
  const {balanceAccount, id} = req.user;
  if (!balanceAccount) {
    return Balance.create({account: id, balance: 0}).
    then((newBalanceAccount) => res.status(200).json(newBalanceAccount)).
    catch((err) => res.status(500).json(err));
  }
  return res.status(200).json(balanceAccount);
};

module.exports = {
  getBalance
};
