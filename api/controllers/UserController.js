import {hashUpdatePassword} from '../utils/transformer.util';

const signup = (req, res) => {
  const {phone, countryCode, password, name, email} = req.body;
  return Account.create({phone, password, countryCode}).
  then((acc) => UserProfile.create({name, email, account: acc.id})).
  then((uprofile) => Balance.create({account: uprofile.account, balance: 0})).
  then((balance) => Account.findOne({id: balance.account}).populateAll()).
  then((account) => res.status(200).json(account)).
  catch((err) => res.status(400).json(err));
};

const getUser = (req, res) => res.status(200).json(req.user);

const updateUserProfile = (req, res) => {
  const userId = req.user.id;
  const userDetails = {...req.body, account: userId};
  return UserProfile.update({account: userId}, userDetails).
  then((updated) => {
    if (!updated[0]) {
      return UserProfile.create({...userDetails, account: userId});
    }
    return updated[0];
  }).
  then((up) => res.status(200).json(up)).
  catch((err) => res.status(500).json(err));
};

const passwordReset = (req, res) => hashUpdatePassword(req.body, function (pass, err) {
  if (err) {
    return res.status(500).json(err);
  }
  return Account.update({id: req.user.id}, req.body).
 then((up) => res.status(200).json(up)).
 catch((err) => res.status(500).json(err));
});



const deactivateAccount = (req, res) => Account.update({id: req.user.id}, {status: 'inactive'}).
then((u) => res.status(200).json(u)).
catch((err) => res.status(500).json(err));


module.exports = {
  signup,
  getUser,
  updateUserProfile,
  passwordReset,
  deactivateAccount
};
