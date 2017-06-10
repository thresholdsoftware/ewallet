var dbHelper = require('../api/utils/dbHelper.util');
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
  dbHelper.cleanupProcedures()
  .then(()=>dbHelper.generateCalculateBalanceSP())
  .then(()=>dbHelper.generateTrigger())
  .then(()=>console.log('Setting up Trigger'))
  .catch((err)=>sails.log.error(err));

  dbHelper.generateTransactionFeeEnteries()
  .then(()=>console.log('Setup transaction fees'))
  .catch((err)=>sails.log.error(err));

  dbHelper.generateBankAccount()
  .then(()=>console.log('Generating bank account'))
  .catch((err)=>sails.log.error(err));
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
