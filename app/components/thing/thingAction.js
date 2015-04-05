'use strict';

var Dispatcher = require('../../util/dispatcher');
var api = require('../../api/api');
var cache = require('../../util/cache');
var ThingConstants = require('./thingConstants').ThingConstants;

var ThingAction = {
  getData: (token, displayName, req) => {
    var cached = cache.get(token, displayName);
    if (cached) {
      Dispatcher.transmit(ThingConstants.GET_THINGS)(cached);
      return cached;
    }
    return api.get('/thing', Dispatcher.transmit(ThingConstants.GET_THINGS), req);
  },
  create: function (payload) {
    return api.post('/thing', payload, Dispatcher.transmit(ThingConstants.CREATE_THING));
  },
  update: (id, payload) => {
    api.put('/thing/' + id, payload, Dispatcher.transmit(ThingConstants.UPDATE_THING));
  },
  del: (id) => {
    api.del('/thing/' + id, Dispatcher.transmit(ThingConstants.DELETE_THING));
  }
};

module.exports = ThingAction;
