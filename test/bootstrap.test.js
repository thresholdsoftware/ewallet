const sails = require('sails');

before(function beforeSpawn(done) {
  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(5000);

  sails.lift({
    // configuration for testing purposes
  }, (err, server) => {
    if (err) {
      return done(err);
    }
    console.log('server', server); //eslint-disable-line
    // here you can load fixtures, etc.
    return done(err, sails);
  });
});

after((done) => {
  // here you can clear fixtures, etc.
  sails.lower(done);
});
