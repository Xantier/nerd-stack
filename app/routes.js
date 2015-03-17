'use strict';

//Imports
var Cookies = require('cookies');
var uuid = require('uuid');
var React = require('react');
var Router = require('react-router');
var reactRouter = require('./router');
var cache = require('./cache');
var dispatcher = require('./dispatcher');

module.exports = function (app) {
   app.use('*', function (req, res) {
      var cookies = new Cookies(req, res);
      var token = cookies.get('token') || uuid();
      cookies.set('token', token, {maxAge: 30 * 24 * 60 * 60});
      serverRenderer(req, token, (error, html, clientToken) => {
         if (!error) {
            res.render('layout', {data: JSON.stringify(clientToken), html: html});
         }
      });
   });
};

var serverRenderer = (req, token, cb) => {
   var path = req.baseUrl;

   var router = Router.create({
      routes: reactRouter(token),
      location: path,
      onAbort: function (redirect) {
         cb({redirect});
      },
      onError: function (err) {
         console.log('Routing Error');
         console.log(err);
      }
   });

   router.run((Handler, state) => {
      if (state.routes[0].name === 'not-found') {
         var html = React.renderToStaticMarkup(<Handler/>);
         cb({notFound: true}, html);
         return;
      }
      dispatcher(token, state).then((data) => {
         var clientToken = {token, data: cache.clean(token)};
         var html = React.renderToString(<Handler data={data} />);
         cb(null, html, clientToken);
      });
   });
};
