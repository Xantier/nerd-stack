'use strict';

var Dispatcher = require('../../util/dispatcher');
var api = require('../../api/api');

var ThingAction = {

  create: function (payload) {
    api.post('/thing', payload, Dispatcher.transmit('createThing'));
  },

  getData: () => {
    api.get('/thing', Dispatcher.transmit('getThings'));
  }
};

module.exports = ThingAction;
