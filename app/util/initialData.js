'use strict';

var all = require('when/keys').all;

module.exports = (token, routerState, req) => {
  return all(routerState.routes.filter((route) => {
    return route.handler.fetchData;
  }).reduce((promises, route) => {
    promises[route.handler.displayName] = route.handler.fetchData(token, req);
    if (route.handler.children) {
      route.handler.children.forEach(function (child) {
        promises[child.displayName] = child.fetchData(token, req);
      });
    }
    return promises;
  }, {}));
};
