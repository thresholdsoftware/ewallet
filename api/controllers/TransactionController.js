/* globals , TransactionFee*/
import result from 'lodash/result';
import {getTransferType} from '../utils/transformer.util';

const _generateTransactionInfo = (fromUserPhone, toUserPhone, transferAmount) => {
  const fromPhone = parseInt(fromUserPhone);
  const toPhone = parseInt(toUserPhone);
  const amount = parseInt(transferAmount);
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
    from_account: 0,
    to_account: req.user.id,
    transaction_type: 'CREDIT',
    amount: req.body.amount,
    metadata: 'From Bank Account',
    finalAmount: req.body.amount
  };
  return Transaction.create(t).then((u) => {
    res.status(200).json(u);
  }, (err) => {
    res.status(400).json({
      err: err.message || err
    });
  });
};


const getTransactions = (req, res) => {
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() - 1);
  const fromDate = new Date(req.query.from_date || defaultDate);
  const toDate = new Date(req.query.to_date || Date.now());
  const account = req.user.id;
  Transaction.find({
    where: {
      or: [
        {
          from_account: account
        }, {
          to_account: account
        }
      ],
      createdAt: {
        '>=': fromDate,
        '<=': toDate
      }
    },
    sort: 'createdAt DESC'
  }).populate('from_account').populate('to_account').then((u) => res.status(200).json(u)).catch((err) => res.status(500).json(err));
};

module.exports = {
  transact,
  transactionInfo,
  getTransactions,
  testCreditTransaction
};
