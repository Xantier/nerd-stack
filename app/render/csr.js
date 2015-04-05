'use strict';

var React = require('react');
var Router = require('react-router');
var routes = require('../components/routes');
var dataLoader = require('../util/dataLoader');
var rehydrate = require('../util/rehydrate');

var token = rehydrate.rehydrate();

var renderState = {
  element: document.getElementById('content'),
  Handler: null,
  routerState: null
};

var render = () => {
  var { element, Handler, routerState } = renderState;
  dataLoader(token, routerState).then((data) => {
    React.render(<Handler params={data} />, element);
  });
};

Router.run(routes(), Router.HistoryLocation, function (Handler, routerState) {
  renderState.Handler = Handler;
  renderState.routerState = routerState;
  render();
});
