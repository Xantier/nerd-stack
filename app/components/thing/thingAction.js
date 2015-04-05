'use strict';

var Dispatcher = require('../../util/dispatcher');
var api = require('../../api/api');
var cache = require('../../util/cache');
var actions = require('./thingConstants').ActionTypes;

var ThingAction = {
  getData: (token, displayName, req) => {
    var cached = cache.get(token, displayName);
    if (cached) {
      Dispatcher.transmit(actions.GET_THINGS)(cached);
      return cached;
    }
    return api.get('/thing', Dispatcher.transmit(actions.GET_THINGS), req);
  },
  create: function (payload) {
    return api.post('/thing', payload, Dispatcher.transmit(actions.CREATE_THING));
  },
  update: (id, payload) => {
    api.put('/thing/' + id, payload, Dispatcher.transmit(actions.UPDATE_THING));
  },
  del: (id) => {
    api.del('/thing/' + id, Dispatcher.transmit(actions.DELETE_THING));
  }
};

module.exports = ThingAction;
