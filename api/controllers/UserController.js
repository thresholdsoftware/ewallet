import {hashPassword} from '../utils/transformer.util';
import TwillioAPI from '../utils/TwillioUtils';

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


const sendPasswordResetVerificationMessage = (req, res) => {
  const {phone} = req.body;
  return Account.findOne({phone}).
  then((acc) => TwillioAPI.sendMessage(acc.phone, acc.countryCode)).
  then((success) => res.status(200).json({status: 'SUCCESS', success})).
  catch((error) => {
    sails.log.error(error);
    return res.status(500).json(error);
  });
};

const passwordReset = (req, res) => {
  const {phone, code, password} = req.body;
  return Account.findOne({phone}).
  then((acc) => TwillioAPI.verifyPasscode(acc.phone, acc.countryCode, code)).
  then(() => hashPassword({password})).
  then(({hashedPassword}) => Account.update({phone}, {password: hashedPassword})).
  then((updatedAccount) => res.status(200).json(updatedAccount)).
  catch((err) => res.status(500).json(err));
};

const changePassword = (req, res) => {
  const {newPassword, password} = req.body;
  return hashPassword(password).
  then((hashedOldPassword) => {
    if (req.user.password !== hashedOldPassword) {
      throw new Error('Incorrect current password');
    }
    return hashPassword(newPassword);
  }).
  then((newHashedPassword) => Account.update({id: req.user.id}, {password: newHashedPassword})).
  then((acc) => res.status(200).json(acc)).
  catch((err) => res.status(500).json(err));
};

const deactivateAccount = (req, res) => Account.update({id: req.user.id}, {status: 'inactive'}).
then((u) => res.status(200).json(u)).
catch((err) => res.status(500).json(err));


module.exports = {
  signup,
  getUser,
  updateUserProfile,
  sendPasswordResetVerificationMessage,
  passwordReset,
  deactivateAccount,
  changePassword
};
