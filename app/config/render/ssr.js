'use strict';

//Imports
var React = require('react');
var Router = require('react-router');
var routes = require('../../components/routes');
var initialData = require('../../util/initialData');
var cache = require('../../util/cache');

module.exports = (req, token, cb) => {
   var path = req.baseUrl;

   var router = Router.create({
      routes: routes(),
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
      if (state.routes.length === 0 || state.routes[0].name === 'not-found') {
         cb({message: 'Unable to find path '+state.path});
         return;
      }
      initialData(token, state).then((data) => {
         var clientToken = {token, data: cache.clean(token)};
         var html = React.renderToString(<Handler params={data} />);
         cb(null, html, clientToken);
      });
   });
};