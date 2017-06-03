

module.exports = {
  attributes: {
    userProfile: {
      model: 'UserProfile',
      required: true,

    },
    creditStatus: {
      type: 'string',
      enum: [
        'APPROVED', 'PENDING'
      ],
      required: true
    },
    transactionId: {
      type: 'integer',
      unique: true
    }
  }
};
