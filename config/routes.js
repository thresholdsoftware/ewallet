/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /* **************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': {
  //   view: 'homepage'
  // },
  'get /login': {
    view: 'login'
  },

  'get /signup': {
    view: 'signup'
  },

  'post /login': 'AuthController.login',
  '/logout': 'AuthController.logout',

  'post /signup': 'UserController.signup',
  'get /user': 'UserController.getUser',
  'get /balance': 'BalanceController.getBalance',
  'post /bank-details': 'UserController.updateBankDetails',
  'get /transactions': 'TransactionController.getTransactions',
  'post /profile': 'UserController.updateUserProfile',
  'post /passwordreset': 'UserController.passwordReset',
  'post /deactivate': 'UserController.deactivateAccount',
  'post /transact': 'TransactionController.transact',
  'post /test-credit': 'TransactionController.testCreditTransaction',

  'get /test': 'TestController.getTest',
  'post /test': 'TestController.postTest',
  'get /err': 'TestController.errTest',

  'post /generate-scratch-card': 'ScratchCardController.generateScratchCard',
  'post /use-scratchcard': 'ScratchCardController.useScratchCard',
  'post /activate-scratch-card-group': 'ScratchCardController.activateScratchCardGroup',
  '/transaction': { policy: 'isAuthenticated' },
  '/ScratchCard': { policy: 'isAuthenticated' },
  '/Bank': { policy: 'isAuthenticated' },


  'get /transactionFees' : 'TransactionFeeController.getTransactionFees',
  'post /createTransactionFee' : 'TransactionFeeController.createTransactionFee',
  'put /updateTransactionFee/:transactionType' : 'TransactionFeeController.updateTransactionFee',

  'get /creditRequests' : 'CreditRequestController.getCreditRequests',
  'put /updateCreditRequest/:transactionId' : 'CreditRequestController.updateCreditRequest',
  'post /createCreditRequest' : 'CreditRequestController.createCreditRequest',

  'post /sendVerificationMessage' : 'TwillioController.sendVerificationMessage',
  'post /verifyMessage' : 'TwillioController.verifyMessage',

  /* ***
  ***********************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
