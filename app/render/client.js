import React from 'react';
import Router from 'react-router';
import routes from '../components/routes';
import dataLoader from '../util/dataLoader';
import {get as getCached} from '../util/cache';
import rehydrate from '../util/rehydrate';

const token = rehydrate();

const renderState = {
  element: document.getElementById('content'),
  Handler: null,
  routerState: null
};

function render() {
  let { element, Handler, routerState } = renderState;
  // This rehydrates our stores through our initial data load methods.
  dataLoader(token, routerState, {}).then(() => {
    React.render(<Handler loggedIn={getCached(token, 'loggedIn')} />, element);
  });
}

Router.run(routes(), Router.HistoryLocation, function (Handler, routerState) {
  renderState.Handler = Handler;
  renderState.routerState = routerState;
  render();
});
