var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcryptjs');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Account.findOne({
    id: id
  }, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'phone',
  passwordField: 'password'
}, function(phone, password, done) {
  Account.findOne({phone: phone}).populate('userprofile').populate('balanceAccount').populate('bank').then(function(user) {
    if (!user) {
      return done(null, false, {message: 'Incorrect phone.'});
    }
    bcrypt.compare(password, user.password, function(err, res) {
      if (!res) {
        return done(null, false, {message: 'Invalid Password'});
      }
      return done(null, user, {message: 'Logged In Successfully'});
    });
  }).catch(err => done(err));
}));
