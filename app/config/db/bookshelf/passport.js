'use strict';

var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

/**
 * Expose
 */

module.exports = function (passport, db) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    var usernamePromise = new db.models.User({id: id}).fetch();
    usernamePromise.then(function (model) {
      done(null, model);
    });
  });

  passport.use('register', new LocalStrategy({
        passReqToCallback: true
      }, function (req, username, password, done) {
        var user = req.body;
        var dbUser = new req.db.models.User({name: username}).fetch();

        return dbUser.then(function (model) {
          if (model) {
            return done(null, false, req.flash('message', 'User Already Exists'));
          } else {
            var hash = bcrypt.hashSync(password);
            var newUser = new req.db.models.User({name: user.username, password: hash});
            newUser.save().then(function (savedUser) {
              return done(null, savedUser, req.flash('message', 'User Saved'));
            });
          }
        });
      })
  );

  // use local strategy
  passport.use('signin', new LocalStrategy(
      function (username, password, done) {
        var User = db.models.User.forge({name: username});
        User.fetch({require: true})
            .then(function (data) {
              var user = data;
              if (user === null) {
                return done(null, false, {message: 'Unknown user'});
              } else {
                user = data.toJSON();
                if (!bcrypt.compareSync(password, user.password)) {
                  return done(null, false, {message: 'Invalid username or password'});
                } else {
                  return done(null, user);
                }
              }
            })
            .otherwise(function (error) {
              throw error;
            });
      }));
};
