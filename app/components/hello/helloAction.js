'use strict';

var Dispatcher = require('../../util/dispatcher');
var api = require('../../api/api');

var HelloAction = {

   create: function (text) {
      api.post('/user', text, Dispatcher.transmit('create'))
   },

   getData: () => {
      api.get('/user', Dispatcher.transmit('get'));
   }
};

module.exports = HelloAction;