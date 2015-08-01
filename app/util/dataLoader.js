import {all} from 'when/keys';
let token;
let context;

function handleChildren(promises, children) {
  if (children) {
    children.forEach(function (child) {
      context.displayName = child.displayName;
      context.token = token;
      promises[child.displayName] = child.load(context);
      handleChildren(promises, child.children);
    });
  }
  return promises;
}

export default (_token, routerState, _context) => {
  token = _token;
  context = _context || {};
  return all(routerState.routes.filter((route) => {
    return route.handler.load;
  }).reduce(function fillPromises(promises, route) {
    context.displayName = route.handler.displayName;
    context.token = token;
    promises[route.handler.displayName] = route.handler.load(context);
    return handleChildren(promises, route.handler.children);
  }, {}));
};
