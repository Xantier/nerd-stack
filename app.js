'use strict';

// Transpile all ES6 to ES5
require('babel/register');

var express = require('express');
var passport = require('passport');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./app/config/db/bookshelf/bookshelf');

var app = express();

// Bootstrap passport config
require('./app/config/db/bookshelf/passport')(passport, db);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/views/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'wat is this thing?',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('less-middleware')(path.join(__dirname, 'public')));

/*eslint-disable */
app.use(express.static(path.join(__dirname, '/public/build')));
/*eslint-enable */

app.use(function (req, res, next) {
  req.db = db;
  next();
});

require('./app/config/router/router')(app);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
