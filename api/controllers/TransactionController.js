/* globals , TransactionFee*/
import result from 'lodash/result';
import {getTransferType} from '../utils/transformer.util';

const _generateTransactionInfo = (fromUserPhone, toUserPhone, transferAmount) => {
  const fromPhone = parseInt(fromUserPhone) || null;
  const toPhone = parseInt(toUserPhone) || null;
  const amount = parseInt(transferAmount) || null;
  if (!amount) {
    throw {message: 'Invalid amount'};
  }
  return Account.find({phone: [fromPhone, toPhone]}).populate('userProfile').
  then(([fromAccount, toAccount]) => {
    if (!fromAccount || !toAccount) {
      throw {message: 'Phone number not registerd'};
    }
    const transactionType = getTransferType(fromAccount, toAccount);
    return TransactionFee.findOne({transactionType}).then((transactionFee) => {
      if (!transactionFee) {
        throw {message: 'Unsupported Transaction type', transactionType};
      }
      return {fromAccount, toAccount, transactionType, amount, fee: transactionFee.fee};
    });
  });
};

const transact = (req, res) => {
  const fromPhone = req.user.phone;
  const toPhone = result(req, 'body.toPhone');
  const amount = result(req, 'body.amount');
  return _generateTransactionInfo(fromPhone, toPhone, amount).
  then((transactionInfo) => {
    const {fromAccount, toAccount, transactionType, amount, fee} = transactionInfo;
    return Transaction.create({fromAccount: fromAccount.phone,
      fee, toAccount: toAccount.phone, transactionType, amount});
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
  const t = {
    fromAccount: 0,
    toAccount: req.user.id,
    transactionType: 'BANK_TO_WALLET',
    amount: req.body.amount,
    note: 'From Bank Account',
    fee: 0
  };
  return Transaction.create(t).
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

module.exports = {
  transact,
  transactionInfo,
  getTransactions,
  testCreditTransaction
};
