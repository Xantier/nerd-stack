'use strict';

const render = require('../render/ssr');
const api = require('./apiRouter');
const Cookies = require('cookies');
const uuid = require('uuid');

function renderWithReact(req, res) {
  const cookies = new Cookies(req, res);
  const token = cookies.get('token') || uuid();
  cookies.set('token', token, {maxAge: 30 * 24 * 60 * 60});
  render(req, token, function (error, html, clientToken) {
    if (!error) {
      res.render('index', {
        data: JSON.stringify(clientToken),
        html: html,
        message: {
          error: req.flash('error'),
          success: req.flash('success')
        }
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
    failureRedirect: '/signin',
    failureFlash: true
  }));

  app.get('/register', function (req, res) {
    renderWithReact(req, res);
  });

  app.post('/register', passport.authenticate('register', {
    successRedirect: '/signin',
    failureRedirect: '/register',
    failureFlash: true,
    successFlash: true
  }));

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  function auth(req, res, next) {
    if (!req.isAuthenticated()) {
      res.redirect('/signin');
    } else {
      return next();
    }
  }

  // API Routes
  app.use('/API', auth, api);

  // Rendered routes
  app.use('*', auth, function (req, res) {
    renderWithReact(req, res);
  });

  // 404 Error handling
  app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
};
