'use strict';

var Dispatcher = require('../../util/dispatcher');
var api = require('../../api/api');

var ThingAction = {

  create: function (token, payload) {
    return api.post(token, '/thing', payload, Dispatcher.transmit('createThing'));
  },

  getData: (token) => {
    return api.get(token, '/thing', Dispatcher.transmit('getThings'));
  }
};

module.exports = ThingAction;
