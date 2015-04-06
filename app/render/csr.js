'use strict';

const React = require('react');
const Router = require('react-router');
const routes = require('../components/routes');
const dataLoader = require('../util/dataLoader');
const rehydrate = require('../util/rehydrate');

const token = rehydrate.rehydrate();

const renderState = {
  element: document.getElementById('content'),
  Handler: null,
  routerState: null
};

function render() {
  let { element, Handler, routerState } = renderState;
  dataLoader(token, routerState).then((data) => {
    React.render(<Handler params={data} />, element);
  });
}

Router.run(routes(), Router.HistoryLocation, function (Handler, routerState) {
  renderState.Handler = Handler;
  renderState.routerState = routerState;
  render();
});
