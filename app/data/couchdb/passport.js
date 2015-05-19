'use strict';

import {Strategy as LocalStrategy} from 'passport-local';
import bcrypt from 'bcrypt-nodejs';

export default function (passport, db) {
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    let user = db.models.user;
    user.findOneByID(id).then(function (dbUser) {
      done(null, dbUser);
    });
  });

  passport.use('register', new LocalStrategy({passReqToCallback: true},
          function (req, username, password, done) {
            if (password !== req.body.password2) {
              return done(null, false, {message: 'Passwords don\'t match'});
            }
            const user = req.body;
            db.models.user.findOneByName(username).then(function (result) {
              console.log(result);
              if (result.length) {
                return done(null, false, {message: 'User Already Exists.'});
              }
              const hash = bcrypt.hashSync(password);
              db.models.user.create({
                name: user.username,
                password: hash
              }).then(function (savedUser) {
                return done(null, savedUser, {message: 'User Registered.'});
              }).error(function (err) {
                return done(err);
              });
            });
          }
      )
  );

  passport.use('signin', new LocalStrategy(
      function (username, password, done) {
        db.models.user.filter({name: username}).run().then(function (user) {
          if (!user.length || user.length < 1) {
            done(null, false, {message: 'Unknown user.'});
          } else if (!bcrypt.compareSync(password, user[0].password)) {
            done(null, false, {message: 'Invalid username or password.'});
          } else {
            done(null, user[0]);
          }
        }).catch(function (err) {
          done(err);
        });
      }));
}
