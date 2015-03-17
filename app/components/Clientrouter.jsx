'use strict';

var React = require('react');
var Router = require('react-router');
var getRoutes = require('./app.jsx');
var { EventEmitter } = require('events');

var loadingEvents = new EventEmitter();
var rehydrate = require('../rehydrate');
var dispatcher = require('../dispatcher');

var token = rehydrate();

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

Router.run(getRoutes(token), Router.HistoryLocation, function(Handler, routerState) {
   renderState.Handler = Handler;
   renderState.routerState = routerState;
   render();
});