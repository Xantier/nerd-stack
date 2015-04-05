'use strict';

var Dispatcher = require('../../util/dispatcher');
var cache = require('../../util/cache');
var api = require('../../api/api');
var HelloConstants = require('./helloConstants').HelloConstants;

var HelloAction = {
  getData: (token, displayName, req) => {
    var cached = cache.get(token, displayName);
    if (cached) {
      Dispatcher.transmit(HelloConstants.GET)(cached);
      return cached;
    }
    return api.get('/user', Dispatcher.transmit(HelloConstants.GET), req);
  }
};

module.exports = HelloAction;
