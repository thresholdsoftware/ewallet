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
        return res.status(401).json({message: info.message, user});
      }
      return req.logIn(user, (error) => {
        if (error) {
          res.status(401).json(error);
        }
        return res.status(200).json({message: info.message, user});
      });
    })(req, res);
  },

  logout: (req, res) => {
    req.logOut();
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({message: 'Logout unsuccessful', err});
      }
      return res.status(200).json({message: 'Logout successful'});
    });
  }
};
