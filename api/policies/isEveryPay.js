import ipware from 'ipware';

module.exports = function(req, res, next) {
  const getIpOfUser = ipware().get_ip;
  const {clientIp} = getIpOfUser(req);
  req.userIpAddress = clientIp;
  const everyPayIps = [];
  const areYouAllowed = everyPayIps.includes(req.userIpAddress);

  if (areYouAllowed) {
    return UserProfile.findOne({userType: 'PAYMENT_ADMIN'})
    .then((paymentAdmin)=>{
      req.paymentAdminUser = paymentAdmin;
      return next();
    }).catch((err) => {
      return res.status(500).json('Payment admin user not present');
    });
  }
  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};
