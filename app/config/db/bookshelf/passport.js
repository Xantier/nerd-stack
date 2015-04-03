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

  passport.use('register', function (req, res, next) {
    var user = req.body;
    var usernamePromise = new req.db.models.User({name: user.username}).fetch();

    return usernamePromise.then(function (model) {
      if (model) {
        res.render('register', {title: 'register', errorMessage: 'username already exists'});
      } else {
        var password = user.password;
        var hash = bcrypt.hashSync(password);

        var signUpUser = new req.db.models.User({name: user.username, password: hash});
        signUpUser.save().then(function (savedmodel) {
          next(savedmodel);
        });
      }
    });
  });

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
