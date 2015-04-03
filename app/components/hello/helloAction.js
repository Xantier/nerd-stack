'use strict';

var Dispatcher = require('../../util/dispatcher');
var api = require('../../api/api');

var HelloAction = {

  create: function (token, payload) {
    return api.post(token, '/user', payload, Dispatcher.transmit('create'));
  },

  getData: (token) => {
    return api.get(token, '/user', Dispatcher.transmit('get'));
  }
};

module.exports = HelloAction;
