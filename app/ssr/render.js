'use strict';

//Imports
var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var cache = require('../cache');
var dispatcher = require('../dispatcher');

module.exports = (req, token, cb) => {
   var path = req.baseUrl;

   var router = Router.create({
      routes: routes(token),
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


