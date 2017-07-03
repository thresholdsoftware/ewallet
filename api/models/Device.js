/**
 * Device.js
 *
 * @description :: Device model for managing user profile
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    account: {
      model: 'Account',
      index: true,
      required: true
    },
    deviceId: {
      type: 'string',
      required: true,
      index: true
    },
    deviceName: {
      type: 'string',
      required: true
    },
    notificationId: {
      type: 'string'
    },
    verified: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};
