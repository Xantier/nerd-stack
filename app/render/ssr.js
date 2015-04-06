'use strict';

const React = require('react');
const Router = require('react-router');
const routes = require('../components/routes');
const dataLoader = require('../util/dataLoader');

module.exports = (req, token, cb) => {
  const path = req.originalUrl;
  const router = Router.create({
    routes: routes(),
    location: path,
    onAbort: function (redirect) {
      cb({redirect});
    },
    onError: function (err) {
      // TODO: Logging, Don't return err.
      return err;
    }
  });

  router.run((Handler, state) => {
    if (state.routes.length === 0 || state.routes[0].name === 'not-found') {
      cb({message: 'Unable to find path ' + state.path});
      return;
    }
    dataLoader(token, state, req).then((data) => {
      const clientToken = {token, data: data};
      const html = React.renderToString(<Handler params={data} />);
      cb(null, html, clientToken);
    });
  });
};
