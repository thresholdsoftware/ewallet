/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

import passport from 'passport';

module.exports = {
  login: (req, res) => {
    passport.authenticate('local', (err, user, info) => {
      if ((err) || (!user)) {
        return res.send({message: info.message, user});
      }
      return req.logIn(user, (error) => {
        if (error) {
          res.send(error);
        }
        return res.send({message: info.message, user});
      });
    })(req, res);
  },

  logout: (req, res) => {
    req.logout();
    res.redirect('/');
  }
};
