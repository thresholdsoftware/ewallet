const signup = (req, res) => {
  Account.create(req.body).then((u) => {
    res.status(200).json(u);
  }, (err) => {
    res.status(500).json(err);
  });
};

const getUser = (req, res) => {
  return Account.findOne({id: req.user.id}).populateAll().then((u) => {
    return res.status(200).json(u);
  }, (err) => {
    return res.status(500).json(err);
  });
};
module.exports = {
  signup,
  getUser
};
