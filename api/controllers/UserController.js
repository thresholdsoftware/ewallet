const signup = (req, res) => {
  return Account.create(req.body).then((u) => {
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

const updateUserProfile = (req, res) => {
  const userDetails = req.body;
  return UserProfile.update({
    id: req.user.id
  }, userDetails).then((u) => {
    return res.status(200).json(u);
  }, (err) => {
    return res.status(500).json(err);
  });
};

const passwordReset = (req, res) => {
  return Account.update({
    id: req.user.id
  }, req.body.newPassword).then((u) => {
    return res.status(200).json(u);
  }, (err) => {
    return res.status(500).json(err);
  });
};

const deactivateAccount = (req, res) => {
  return Account.update({
    id: req.user.id
  }, {status: 'inactive'}).then((u) => {
    return res.status(200).json(u);
  }, (err) => {
    return res.status(500).json(err);
  });
};

module.exports = {
  signup,
  getUser,
  updateUserProfile,
  passwordReset,
  deactivateAccount
};
