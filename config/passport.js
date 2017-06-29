var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcryptjs');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Account.findOne({id: id})
  .populate('userProfile').populate('balanceAccount').populate('devices')
  .then((user) => done(null,user))
  .catch((err) => done(err, null))
});

passport.use(new LocalStrategy({
  usernameField: 'phone',
  passwordField: 'password'
}, function(phone, password, done) {
  Account.findOne({phone: phone}).populate('userProfile').populate('balanceAccount').populate('devices')
  .then(function(user) {
    if (!user) {
      return done(null, false, {message: 'Incorrect credentials'});
    }
    bcrypt.compare(password, user.password, function(err, res) {
      if (!res) {
        return done(null, false, {message: 'Incorrect credentials'});
      }
      return done(null, user, {message: 'Logged In Successfully'});
    });
  }).catch(err => done(err));
}));
