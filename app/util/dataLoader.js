'use strict';

import {all} from 'when/keys';
let token;
let context;

function handleChildren(promises, children) {
  if (children) {
    children.forEach(function (child) {
      promises[child.displayName] = child.load(token, context);
      handleChildren(promises, child.children);
    });
  }
  return promises;
}

export default (_token, routerState, _context) => {
  token = _token;
  context = _context;
  return all(routerState.routes.filter((route) => {
    return route.handler.load;
  }).reduce(function fillPromises(promises, route) {
    promises[route.handler.displayName] = route.handler.load(token, context);
    return handleChildren(promises, route.handler.children);
  }, {}));
};
