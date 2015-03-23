'use strict';

var render = require('../ssr');
var user = require('../api/user');
var Cookies = require('cookies');
var uuid = require('uuid');

module.exports = function (app) {

   app.use('/API/:page', function (req, res, next) {
      user(req, res);
   });

// Eventually you will want to have multiple server rendered "front pages" for each
// different part of the application. Refactor this one to an individual router file
   app.use('*', function (req, res) {
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
            res.render('error', {
               message: error.message,
               error: error
            });
         }
      });
   });

// catch 404 and forward to error handler
   app.use(function (req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
   });
};