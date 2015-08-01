import _ from 'lodash';
import { stack } from '../router/apiRouter.js';

export function handleServerRequest(url, context) {
  const matchingRoute = _.find(stack, function (route) {
    return route.regexp.test(url);
  });
  if (matchingRoute) {
    let res = {};
    // At the moment we match only first middleware on API routes.
    // This might need to be modified if there is a need to add additional middleware to routes.
    // handle populates res and calls a callback that will that return populated response
    return matchingRoute.route.stack[0].handle(context, res, function () {
      /* Don't dispatch on server rendering.
       * We don't want our stores to be populated
       */
      return res.payload;
    });
  }
}
