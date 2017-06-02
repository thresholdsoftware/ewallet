/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
  Balance.query(`
		CREATE TRIGGER update_bal123 after INSERT ON transaction
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
		 END;
`, function(err, records) {
    if (err) {
      console.log(err)
    }
  });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};


//	update balance set balance = (IFNULL(((select SUM(amount) from ewallet.transaction where to_account=NEW.to_account )-IFNULL((select SUM(amount) from ewallet.transaction where from_account=NEW.to_account ),0)),NEW.amount)-(NEW.finalAmount)) where account = NEW.to_account;
