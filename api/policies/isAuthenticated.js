import ipware from 'ipware';

module.exports = function(req, res, next) {
  const getIpOfUser = ipware().get_ip;
  const {clientIp} = getIpOfUser(req);
  req.userIpAddress = clientIp;

  // if (req.isAuthenticated()) {
  //   return next();
  // } else {
  //   return res.status(401).json({message: 'not logged in!'});
  // }
  next();
};
