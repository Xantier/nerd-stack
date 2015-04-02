'use strict';

var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

/**
 * Expose
 */

module.exports = function (passport, db) {
  // serialize sessions
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    var User = new db.models.User();
    User.fetchOne({id: id}, function (err, user) {
      done(err, user);
    });
  });

  // use local strategy
  passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
  }, function (username, password, done) {
    var User = new db.models.User({name: username});
    User.fetch({require: true}).then(function (data) {
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
    });
  }));
};
