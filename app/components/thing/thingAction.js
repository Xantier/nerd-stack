'use strict';

var Dispatcher = require('../../util/dispatcher');
var api = require('../../api/api');
var actions = require('./thingConstants').ActionTypes;

var ThingAction = {

  getData: (token) => {
    return api.get(token, '/thing', Dispatcher.transmit(actions.GET_THINGS));
  },
  create: function (token, payload) {
    return api.post(token, '/thing', payload, Dispatcher.transmit(actions.CREATE_THING));
  },
  update: (id, payload) => {
    api.put('/thing/' + id, payload, Dispatcher.transmit(actions.UPDATE_THING));
  },
  del: (id) => {
    api.del('/thing/' + id, Dispatcher.transmit(actions.DELETE_THING));
  }
};

module.exports = ThingAction;
