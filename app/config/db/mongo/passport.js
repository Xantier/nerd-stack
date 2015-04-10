'use strict';

import {Strategy as LocalStrategy} from 'passport-local';
import bcrypt from 'bcrypt-nodejs';

module.exports = function (passport, db) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    db.models.User.findOne({_id: id}, function (err, user) {
      done(err, user);
    });
  });

  passport.use('register', new LocalStrategy({
        passReqToCallback: true
      }, function (req, username, password, done) {
        const user = req.body;
        req.db.models.User.findOne({name: username}, function (model) {
          if (model) {
            return done(null, false, {message: 'User Already Exists.'});
          }
          const hash = bcrypt.hashSync(password);
          const newUser = req.db.models.User({name: user.username, password: hash});
          newUser.save(function (err) {
            if (err) {
              throw err;
            }
            return done(null, newUser, {message: 'User Registered.'});
          });
        });
      })
  );

  passport.use('signin', new LocalStrategy(
      function (username, password, done) {
        const options = {
          criteria: {name: username}
        };
        db.models.User.load(options, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, {message: 'Unknown user'});
          }
          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {message: 'Invalid password'});
          }
          return done(null, user);
        });
      }
  ));
};
