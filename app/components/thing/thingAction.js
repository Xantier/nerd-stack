'use strict';

var Dispatcher = require('../../util/dispatcher');
var api = require('../../api/api');

var ThingAction = {

  create: function (payload) {
    api.post('/thing', payload, Dispatcher.transmit('create'));
  },

  getData: () => {
    api.get('/thing', Dispatcher.transmit('get'));
  }
};

module.exports = ThingAction;
