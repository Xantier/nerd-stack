//Imports
var serverRenderer = require('./serverRenderer');
var Cookies = require('cookies');
var uuid = require('uuid');


module.exports = function (app) {
   app.use('*', function (req, res) {
      var cookies = new Cookies(req, res);
      var token = cookies.get('token') || uuid();
      cookies.set('token', token, {maxAge: 30 * 24 * 60 * 60});
      serverRenderer(req, token, (error, html, token) => {
         if (!error) {
            res.header('Content-Type', 'text/html');
            res.send(html);
         }
      });
   });
};