'use strict';

var Dispatcher = require('../../util/dispatcher');
var cache = require('../../util/cache');
var api = require('../../api/api');

var HelloAction = {

  create: function (payload) {
    return api.post('/user', payload, Dispatcher.transmit('create'));
  },

  getData: (token, displayName, req) => {
    var cached = cache.get(token, displayName);
    if (cached) {
      Dispatcher.transmit('get')(cached);
      return cached;
    }
    return api.get('/user', Dispatcher.transmit('get'), req);
  }
};

module.exports = HelloAction;
