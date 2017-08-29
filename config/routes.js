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
  'post /profile': 'UserController.updateUserProfile',
  'post /change-password': 'UserController.changePassword',
  'post /send-password-reset-message':'UserController.sendPasswordResetVerificationMessage',
  'post /password-reset': 'UserController.passwordReset',
  'post /deactivate': 'UserController.deactivateAccount',

  'get /balance': 'BalanceController.getBalance',

  'get /transactions': 'TransactionController.getTransactions',
  'post /transactionInfo' : 'TransactionController.transactionInfo',
  'post /transact': 'TransactionController.transact',
  'post /test-credit': 'TransactionController.testCreditTransaction',
  'get /getAllTransactions' : 'TransactionController.getAllTransactions',
  'get /getTransactionsCount' : 'TransactionController.getTransactionsCount',

  'post /generate-scratch-card': 'ScratchCardController.generateScratchCard',
  'post /use-scratchcard': 'ScratchCardController.useScratchCard',
  'post /activate-scratch-card-group': 'ScratchCardController.activateScratchCardGroup',

  '/transaction': { policy: 'isAuthenticated' },
  '/ScratchCard': { policy: 'isAuthenticated' },
  '/Bank': { policy: 'isAuthenticated' },

  'get /transactionFees' : 'TransactionFeeController.getTransactionFees',
  'put /updateTransactionFee/:transactionType' : 'TransactionFeeController.updateTransactionFee',

  'get /creditRequests' : 'CreditRequestController.getCreditRequests',
  'put /updateCreditRequest/:transactionId' : 'CreditRequestController.updateCreditRequest',
  'post /createCreditRequest' : 'CreditRequestController.createCreditRequest',
  'get /getUserCreditRequest' : 'CreditRequestController.getUserCreditRequest',

  'post /send-verification-message' : 'DeviceController.sendVerificationMessage',
  'post /verify-device' : 'DeviceController.verifyDevice',
  'delete /device/:deviceId': 'DeviceController.removeVerifiedDevice',
  'post /update-device-push-token': 'DeviceController.updateDevicePushToken',

  'post /every-pay-payment-page': 'EveryPayController.generatePaymentPage'
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
