'use strict';

const Dispatcher = require('flux').Dispatcher;
const IndexDispatcher = new Dispatcher();

IndexDispatcher.transmit = function (actionType) {
  return function (text) {
    IndexDispatcher.dispatch({
      actionType: actionType,
      text: text
    });
  };
};

module.exports = IndexDispatcher;
