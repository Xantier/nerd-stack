'use strict';

var React = require('react');
var Router = require('react-router');
var routes = require('./routes.jsx');
var cache = require('../cache');
var dispatcher = require('../dispatcher');
var { EventEmitter } = require('events');
var loadingEvents = new EventEmitter();

var fetchToken = () => {
   var data = __DATA__.data;
   var token = __DATA__.token;
   Object.keys(data).forEach((key) => {
      cache.set(token, key, data[key]);
   });
   delete window.__DATA__;
   return token;
};

var token = fetchToken();

var renderState = {
   element: document.getElementById('app'),
   Handler: null,
   routerState: null
};

var render = () => {
   var { element, Handler, routerState } = renderState;
   loadingEvents.emit('start');
   dispatcher(token, routerState).then((data) => {
      loadingEvents.emit('end');
      React.render(<Handler data={data} loadingEvents={loadingEvents} />, element);
   });
};

Router.run(routes, Router.HistoryLocation, function(Handler, routerState) {
   renderState.Handler = Handler;
   renderState.routerState = routerState;
   render();
});