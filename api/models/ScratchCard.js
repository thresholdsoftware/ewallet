/**
 * ScratchCard.js
 *
 * @description :: ScratchCard model for managing user profile
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    generationId: {
      type: 'string',
      required: true
    },
    status: {
      enum: [
        'active', 'used', 'inactive'
      ],
      type: 'string',
      defaultsTo: 'inactive'
    },
    amount: {
      required: true,
      type: 'float'
    }
  }
};
