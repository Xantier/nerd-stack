'use strict';

var render = require('../render/ssr');
var api = require('./apiRouter');
var Cookies = require('cookies');
var uuid = require('uuid');

module.exports = function (app) {

   app.use('/API', api);

   // Rendered routes
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
            // TODO: Add stack trace error object logging and remove from returns on production runs
            res.render('error', {
               message: error.message,
               error: error
            });
         }
      });
   });

   // 404 Error handling
   app.use(function (req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
   });
};