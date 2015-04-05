'use strict';

//Imports
var React = require('react');
var Router = require('react-router');
var routes = require('../components/routes');
var dataLoader = require('../util/dataLoader');

module.exports = (req, token, cb) => {
  var path = req.originalUrl;
  var router = Router.create({
    routes: routes(),
    location: path,
    onAbort: function (redirect) {
      cb({redirect});
    },
    onError: function (err) {
      //TODO: Logging, Don't return err.
      return err;
    }
  });

  router.run((Handler, state) => {
    if (state.routes.length === 0 || state.routes[0].name === 'not-found') {
      cb({message: 'Unable to find path ' + state.path});
      return;
    }
    dataLoader(token, state, req).then((data) => {
      var clientToken = {token, data: data};
      var html = React.renderToString(<Handler params={data} />);
      cb(null, html, clientToken);
    });
  });
};
