'use strict';

import express from 'express';
import flash from 'connect-flash';
import passport from 'passport';
import path from 'path';
import favicon from 'serve-favicon';
import dexter from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import { logger, stream } from './app/util/logger';
import database from './app/config/db';

const db = database(passport);
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/views/favicon.ico'));

logger.info('Overriding Express logger');
app.use(dexter('combined', {'stream': stream}));
app.set('logger', logger);

app.use(methodOverride('_method', {methods: ['POST', 'GET']}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(flash());
app.use(helmet());

app.use(require('express-session')({
  secret: 'wat is this thing?',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/public/build')));

app.use(function (req, res, next) {
  req.db = db;
  next();
});

require('./app/router/router')(app, passport);

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

export default app;
