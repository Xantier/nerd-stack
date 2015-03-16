'use strict';

var all = require('when/keys').all;

// TODO: modify to use the dispatcher style of Facebooks Flux architecture

module.exports = (token, routerState) => {
   var { params, query } = routerState;
   return all(routerState.routes.filter((route) => {
      return route.handler.fetchData;
   }).reduce((promises, route) => {
      promises[route.name] = route.handler.fetchData(token, params, query);
      return promises;
   }, {}));
};