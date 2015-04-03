'use strict';

var render = require('../render/ssr');
var api = require('./apiRouter');
var Cookies = require('cookies');
var uuid = require('uuid');

function renderWithReact(req, res) {
  var cookies = new Cookies(req, res);
  var token = cookies.get('token') || uuid();
  cookies.set('token', token, {maxAge: 30 * 24 * 60 * 60});
  render(req, token, function (error, html, clientToken) {
    if (!error) {
      res.render('index', {
        data: JSON.stringify(clientToken),
        html: html
      });
    } else {
      // TODO: Add stack trace error object logging and remove from returns on production runs
      res.render('error', {
        message: error.message,
        error: error
      });
    }
  });
}
module.exports = function (app, passport) {

  app.get('/signin', function (req, res) {
    renderWithReact(req, res);
  });

  app.post('/signin', passport.authenticate('signin', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
  }));

  app.get('/register', function (req, res) {
    renderWithReact(req, res);
  });

  app.post('/register', passport.authenticate('register', {
    successRedirect: '/signin',
    failureRedirect: '/register',
    failureFlash: true
  }));

  var auth = function (req, res, next) {
    if (!req.isAuthenticated()) {
      res.redirect('/signin');
    } else {
      return next();
    }
  };

  //API Routes
  app.use('/API', auth, api);

  // Rendered routes
  app.use('*', auth, function (req, res) {
    renderWithReact(req, res);
  });

  // 404 Error handling
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
};
