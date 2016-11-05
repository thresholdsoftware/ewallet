var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt');

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

  Account.findOne({
    phone: phone
  }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {message: 'Incorrect phone.'});
    }

    bcrypt.compare(password, user.password, function(err, res) {
      if (!res)
        return done(null, false, {message: 'Invalid Password'});
      var returnUser = {
        phone: user.phone,
        createdAt: user.createdAt,
        id: user.id
      };
      return done(null, returnUser, {message: 'Logged In Successfully'});
    });
  });
}));
