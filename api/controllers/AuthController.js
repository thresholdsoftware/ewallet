/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

import passport from 'passport';
import {checkIfVerifiedDevice} from '../utils/transformer.util';

module.exports = {
  login: (req, res) => {
    const {deviceId} = req.body;
    passport.authenticate('local', (err, user, info) => {
      if ((err) || (!user)) {
        return res.status(401).json({message: info.message, user});
      }
      return req.logIn(user, (error) => {
        if (error) {
          res.status(401).json(error);
        }
        return checkIfVerifiedDevice(user.devices, deviceId).
        then(() => res.status(200).json({message: info.message, user})).
        catch((err) => res.status(403).json(err));
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
