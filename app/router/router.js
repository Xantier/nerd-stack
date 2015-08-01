import render from '../render/server';
import api from './apiRouter';

export default function (app, passport) {

  app.get('/signin', function (req, res) {
    render(req, res);
  });

  app.post('/signin', passport.authenticate('signin', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
  }));

  app.get('/register', function (req, res) {
    render(req, res);
  });

  app.post('/register', passport.authenticate('register', {
    successRedirect: '/',
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
    render(req, res);
  });

  // 404 Error handling
  app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
}
