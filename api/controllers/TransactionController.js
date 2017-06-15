/* globals , TransactionFee*/
import result from 'lodash/result';
import {getTransferType, getTotalAmount} from '../utils/transformer.util';

const _generateTransactionInfo = (fromUserPhone, toUserPhone, transferAmount) => {
  const fromPhone = parseInt(fromUserPhone) || null;
  const toPhone = parseInt(toUserPhone) || null;
  const amount = parseInt(transferAmount) || null;
  if (!amount) {
    throw {message: 'Invalid amount'};
  }
  
 
  return Account.findOne({phone: fromPhone}).populate('userProfile').populate('balanceAccount').then((fromAccount) => Account.findOne({phone: toPhone}).populate('userProfile').populate('balanceAccount').
  then((toAccount) => {
    if (!fromAccount || !toAccount) {
      throw {message: 'Phone number not registerd'};
    }
    const transactionType = getTransferType(fromAccount, toAccount);
    return TransactionFee.findOne({transactionType}).then((transactionFee) => {
      if (!transactionFee) {
        throw {message: 'Unsupported Transaction type', transactionType};
      }
      const totalAmount = getTotalAmount(amount, transactionFee.fee);
      return {fromAccount, toAccount, transactionType, amount, fee: transactionFee.fee, totalAmount};
    });
  }));
 
};

const transact = (req, res) => {
  const fromPhone = req.user.phone;
  const toPhone = result(req, 'body.toPhone');
  const amount = result(req, 'body.amount');
  return _generateTransactionInfo(fromPhone, toPhone, amount).
  then((transactionInfo) => {
    const {fromAccount, toAccount, transactionType, amount, fee, totalAmount} = transactionInfo;
    if (fromAccount.balanceAccount.balance < amount && transactionType === 'WALLET_TO_WALLET') {
      return res.status(400).json({'message': 'Insufficient Balance'});
    }   

    return Transaction.create({fromAccount: fromAccount.id,
      fee, toAccount: toAccount.id, transactionType, amount, totalAmount});
  }).
  then((transaction) => res.status(200).json(transaction)).
  catch((err) => res.status(400).json(err));
};

const transactionInfo = (req, res) => {
  const fromPhone = req.user.phone;
  const toPhone = result(req, 'body.toPhone');
  const amount = result(req, 'body.amount');
  return _generateTransactionInfo(fromPhone, toPhone, amount).
  then((transactionInfo) => res.status(200).json(transactionInfo)).
  catch((err) => res.status(400).json(err));
};

const testCreditTransaction = (req, res) => {
  UserProfile.findOne({userType: 'BANK_ADMIN'}).then((bankUser) => {
    if (!bankUser) {
      throw {message: 'No Bank User in the system'};
    }
    const amount = result(req, 'body.amount');
    const fee = 0;
    const t = {
      fromAccount: bankUser.account,
      toAccount: req.user.id,
      transactionType: 'BANK_TO_WALLET',
      note: 'From Bank Account',
      amount,
      fee,
      totalAmount: getTotalAmount(amount, fee)
    };
    return Transaction.create(t);
  }).
  then((u) => res.status(200).json(u)).
  catch((err) => res.status(400).json({err}));
};


const _transactionFilterCondition = (account, typeOfTransaction) => {
  // here type of transaction is DEBIT, CREDIT or ALL
  switch (typeOfTransaction) {
  case 'DEBIT': return {fromAccount: account};
  case 'CREDIT': return {toAccount: account};
  default: return {or: [{fromAccount: account}, {toAccount: account}]};
  }
};

const getTransactions = (req, res) => {
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() - 31); // one month approx
  const fromDate = new Date(req.query.fromDate || defaultDate);
  const toDate = new Date(req.query.toDate || Date.now());
  const account = req.user.id || null;
  const page = req.query.page || 1;
  const type = req.query.type || 'ALL';
  return Transaction.find({
    where: {
      ..._transactionFilterCondition(account, type),
      createdAt: {'>=': fromDate, '<=': toDate}
    },
    sort: 'createdAt DESC'
  }).populate('fromAccount').populate('toAccount').paginate({page, limit: 10}).
  then((u) => res.status(200).json(u)).
  catch((err) => res.status(500).json(err));
};

const getTransactionsCount = (req,res) => {
  return Transaction.count().then((totalTransactions) => {
      res.status(200).json({totalTransactions:totalTransactions});
  }).catch((err)=> console.log(error));
}

const getAllTransactions = (req, res) => {
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() - 31); // one month approx
  const fromDate = new Date(req.query.fromDate || defaultDate);
  const toDate = new Date(req.query.toDate || Date.now());
  const page = req.query.page || 1;
  return Transaction.find({
    where: {
      createdAt: {'>=': fromDate, '<=': toDate}
    },
    sort: 'createdAt DESC'
  }).populate('fromAccount').populate('toAccount').paginate({page, limit: 10}).
  then((u) => res.status(200).json(u)).
  catch((err) => res.status(500).json(err));
};


module.exports = {
  transact,
  transactionInfo,
  getTransactions,
  testCreditTransaction,
  getAllTransactions,
  getTransactionsCount
};
