/* global TransactionFee*/
const {transactionTypes} = require('../../config/transaction');

const generateCalculateBalanceSP = () => {
  const createSP = `
  CREATE PROCEDURE calculateBalance (IN accountId INT, OUT bal BIGINT)
  SELECT (total_credit - total_debit) into bal from
  ((SELECT ifnull(SUM(total_amount),0) total_debit,from_account from transaction where from_account=accountId) lost,
  (SELECT ifnull(SUM(amount),0) total_credit,to_account from transaction where to_account=accountId) gained);
  `;
  return new Promise((resolve, reject) => {
    Balance.query(createSP, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

const generateTrigger = () => new Promise((resolve, reject) => {
  Balance.query(`
      CREATE TRIGGER UpdateBalanceTrigger after INSERT ON transaction
       FOR EACH ROW
       BEGIN
        call calculateBalance(NEW.to_account,@to_acc_balance);
        call calculateBalance(NEW.from_account,@from_acc_balance);
        update balance set balance = @from_acc_balance where account = NEW.from_account;
        update balance set balance = @to_acc_balance where account = NEW.to_account;
        END
    `, (err, records) => {
    if (err) {
      return reject(err);
    }
    return resolve(records);
  });
});


const _createTransactionFee = (transactionType, fee) => {
  if (transactionTypes.includes(transactionType)) {
    return TransactionFee.findOrCreate({transactionType}, {transactionType, fee});
  }
  return Promise.reject({message: `The transactionType ${transactionType} is not one of ${transactionTypes}`});
};

const generateTransactionFeeEnteries = () => {
  const defaultFees = 0;
  return Promise.all([
    _createTransactionFee('BANK_TO_WALLET', defaultFees),
    _createTransactionFee('WALLET_TO_WALLET', defaultFees),
    _createTransactionFee('DISTRIBUTOR_TO_WALLET', defaultFees),
    _createTransactionFee('WALLET_TO_DISTRIBUTOR', defaultFees)
  ]);
};

const generateBankAccount = () => {
  const phone = 10000, countryCode = '+232', password = 'qwerty', name = 'bank manager', email = 'yolo@yolo.com';
  return Account.findOne({phone}).populate('balanceAccount').then((adminacc) => {
    if (!adminacc) {
      return Account.create({phone, password, countryCode}).
        then((acc) => UserProfile.create({name, email, account: acc.id, userType: 'BANK_ADMIN'})).
        then((uprofile) => Balance.create({account: uprofile.account, balance: 30000})).
        then((balance) => Account.findOne({id: balance.account}).populateAll());
    }
    return adminacc;
  });
};

const pQuery = (sql) => {
  const command = sql;
  return new Promise((resolve, reject) => {
    Balance.query(command, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

const cleanupProcedures = () => Promise.all([
  pQuery('DROP PROCEDURE IF EXISTS calculateBalance'),
  pQuery('DROP TRIGGER IF EXISTS UpdateBalanceTrigger')
]);

const cleanActiveSessions = () => pQuery('TRUNCATE sessions');

module.exports = {
  generateTrigger,
  generateTransactionFeeEnteries,
  generateBankAccount,
  generateCalculateBalanceSP,
  cleanupProcedures,
  cleanActiveSessions
};
