'use strict';

const Dispatcher = require('../../util/dispatcher');
const api = require('../../api/api');
const HelloConstants = require('./helloConstants').HelloConstants;
let cache = require('../../util/cache');

const HelloAction = {
  getData: (token, displayName, req) => {
    const cached = cache.get(token, displayName);
    if (cached) {
      Dispatcher.transmit(HelloConstants.GET)(cached);
      return cached;
    }
    return api.get('/user', Dispatcher.transmit(HelloConstants.GET), req);
  }
};

module.exports = HelloAction;
