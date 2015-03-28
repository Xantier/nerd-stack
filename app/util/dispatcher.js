'use strict';

var Dispatcher = require('flux').Dispatcher;
var IndexDispatcher = new Dispatcher();

IndexDispatcher.transmit = function (actionType) {
  return function (text) {
    IndexDispatcher.dispatch({
      actionType: actionType,
      text: text
    });
  };
};

module.exports = IndexDispatcher;
