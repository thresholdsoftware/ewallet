/* global sails, TransactionFee*/
const transactionTypes = require('../../config/transaction').transactionTypes;

const generateTrigger = () => {
  return new Promise((resolve, reject) => {
    Balance.query(`
      CREATE TRIGGER UpdateBalanceTrigger after INSERT ON transaction
       FOR EACH ROW
       BEGIN
           IF new.transaction_type="CREDIT" AND NEW.from_account != 0 THEN
              signal sqlstate '45001' set message_text = "from account cannot be specified in the credit type transaction";
           END IF;

           IF new.transaction_type="WALLET" AND NEW.from_account is  NULL THEN
              signal sqlstate '45001' set message_text = "from account attribute has to be specified in the wallet transaction";
           END IF;

           IF (select balance from balance where account=NEW.from_account)<NEW.amount AND NEW.transaction_type="WALLET" THEN
              signal sqlstate '45002' set message_text = "Insufficient Balance";
           END IF;

           IF new.transaction_type = "WALLET" THEN
            update balance set balance = IFNULL(((select SUM(finalAmount) from ewallet.transaction where to_account=NEW.to_account)-IFNULL((select SUM(finalAmount) from ewallet.transaction where from_account=NEW.to_account ),0)),NEW.amount) where account = NEW.to_account;
           END If;

           IF new.transaction_type  = "CREDIT" THEN
             update balance set balance = IFNULL(((select SUM(amount) from ewallet.transaction where to_account=NEW.to_account)-IFNULL((select SUM(amount) from ewallet.transaction where from_account=NEW.to_account ),0)),NEW.amount) where account = NEW.to_account;
           END IF;

           update balance set balance = IFNULL(((select SUM(amount) from ewallet.transaction where to_account=NEW.from_account)-IFNULL((select SUM(amount) from ewallet.transaction where from_account=NEW.from_account),0)),0) where account = NEW.from_account;
        END
    `, (err, records) => {
      if (err) {
        return reject(err);
      }
      return resolve(records);
    });
  });
};


const createTransactionFee = (transactionType, transactionFee) => {
  if (transactionTypes.includes(transactionType)) {
    return TransactionFee.findOrCreate({transactionType}, {transactionType, transactionFee});
  }
  return Promise.reject({message: `The transactionType ${transactionType} is not one of ${transactionTypes}`});
};

const generateTransactionFeeEnteries = () => {
  const defaultFees = 0;
  return Promise.all([
    createTransactionFee('BANK_TO_WALLET', defaultFees),
    createTransactionFee('WALLET_TO_WALLET', defaultFees),
    createTransactionFee('DISTRIBUTOR_TO_WALLET', defaultFees),
    createTransactionFee('WALLET_TO_DISTRIBUTOR', defaultFees)
  ]);
};

module.exports = {
  generateTrigger,
  generateTransactionFeeEnteries
};
