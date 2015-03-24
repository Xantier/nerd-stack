'use strict';

var React = require('react');
var Router = require('react-router');
var { Route, NotFoundRoute } = Router;
var routes = require('./routes');
var initialData = require('./util/initialData');
var rehydrate = require('./util/rehydrate');

var token = rehydrate();

var renderState = {
   element: document.getElementById('content'),
   Handler: null,
   routerState: null
};

var render = () => {
   var { element, Handler, routerState } = renderState;
   initialData(token, routerState).then((data) => {
      React.render(<Handler params={data} />, element);
   });
};

Router.run(routes(), Router.HistoryLocation, function(Handler, routerState) {
   renderState.Handler = Handler;
   renderState.routerState = routerState;
   render();
});
