module.exports = {
  attributes: {
    balance: {
      type: 'integer',
      required: true,
      size: 64
    },
    phone: {
      type: 'integer',
      required: true,
      unique: true,
      size: 64
    }
  }
};
