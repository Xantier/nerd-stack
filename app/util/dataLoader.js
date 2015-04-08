'use strict';

import {all} from 'when/keys';

export default (token, routerState, context) => {
  return all(routerState.routes.filter((route) => {
    return route.handler.load;
  }).reduce((promises, route) => {
    promises[route.handler.displayName] = route.handler.load(token, context);
    if (route.handler.children) {
      route.handler.children.forEach(function (child) {
        promises[child.displayName] = child.load(token, context);
      });
    }
    return promises;
  }, {}));
};
