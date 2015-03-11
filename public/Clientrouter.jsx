var React = require('react');
var Router = require('react-router');
var getRoutes = require('./javascripts/app.jsx');
var { EventEmitter } = require('events');
var all = require('when/keys').all;
var loadingEvents = new EventEmitter();

var cache = require('./cache');

var fetchData = (token, routerState) => {
   var { params, query } = routerState;
   return all(routerState.routes.filter((route) => {
      return route.handler.fetchData;
   }).reduce((promises, route) => {
      promises[route.name] = route.handler.fetchData(token, params, query);
      return promises;
   }, {}));
};


var rehydrate = () => {
   var data = __DATA__.data;
   var token = __DATA__.token;
   Object.keys(data).forEach((key) => {
      cache.set(token, key, data[key]);
   });
   delete window.__DATA__;
   return token;
};

var token = rehydrate();

var renderState = {
   element: document.getElementById('app'),
   Handler: null,
   routerState: null
};

var render = () => {
   var { element, Handler, routerState } = renderState;
   loadingEvents.emit('start');
   fetchData(token, routerState).then((data) => {
      loadingEvents.emit('end');
      React.render(<Handler data={data} loadingEvents={loadingEvents} />, element);
   });
};

Router.run(getRoutes(token), Router.HistoryLocation, function(Handler, routerState) {
   renderState.Handler = Handler;
   renderState.routerState = routerState;
   render();
});