import _ from 'lodash';

const signup = (req, res) => {
  return Account.create(req.body).then((u) => {
    res.status(200).json(u);
  }, (err) => {
    res.status(400).json(err);
  });
};

const getUser = (req, res) => {
  const userId = req.user.id;
  return Account.findOne({id: userId}).populateAll().then((u) => {
    if (!u) {
      return res.status(404).json({message: 'user not present'});
    }
    return res.status(200).json(u);
  }, (err) => {
    return res.status(500).json(err);
  });
};

const createUserProfile = (userId, ud) => {
  return UserProfile.create(ud).then((up) => {
    return Account.update({
      id: userId
    }, {userprofile: up.id}).then(() => up);
  });
};

const updateUserProfile = (req, res) => {
  const userId = req.user.id;
  const userDetails = _.assign({}, req.body, {account: userId});
  return UserProfile.update({
    account: userId
  }, userDetails).then((u) => {
    const up = u[0];
    if (!up) {
      return createUserProfile(userId, userDetails).then((us) => {
        res.status(200).json(us);
      });
    }
    return res.status(200).json(up);
  }).catch((err) => {
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
