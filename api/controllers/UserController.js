import _ from 'lodash';

const signup = (req, res) => {
  const {phone, password, name, email} = req.body;
  return Account.create({phone, password})
  .then(acc => UserProfile.create({name, email, account: acc.id}))
  .then((uprofile) => {
    return Balance.create({account: uprofile.account, balance: 0}).then((b) => {
      return Account.update({
        id: uprofile.account
      }, {
        balanceAccount: b.id,
        userprofile: uprofile.id
      });
    });
  }).then((acc) => {
    return Account.find({id: acc[0].id}).populateAll();
  }).then((account) => {
    return res.status(200).json(account);
  }).catch((err) => {
    return res.status(400).json(err);
  });
};

const getUser = (req, res) => {
  const userId = req.user.id;
  return Account.findOne({id: userId})
  .populate('userprofile').populate('balanceAccount').populate('bank')
  .then((u) => {
    if (!u) {
      return res.status(404).json({message: 'user not present'});
    }
    return res.status(200).json(u);
  }).catch((err) => {
    return res.status(500).json(err);
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
      return UserProfile.create(Object.assign({}, userDetails, {account: userId}));
    }
    return up;
  }).then((up) => {
    res.status(200).json(up);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

const passwordReset = (req, res) => {
  return Account.update({
    id: req.user.id
  }, req.body.newPassword).then((u) => {
    return res.status(200).json(u);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

const deactivateAccount = (req, res) => {
  return Account.update({
    id: req.user.id
  }, {status: 'inactive'}).then((u) => {
    return res.status(200).json(u);
  }).catch((err) => {
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
