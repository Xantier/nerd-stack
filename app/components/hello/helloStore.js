'use strict';

var IndexDispatcher = require('../../util/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var HelloConstants = require('./helloConstants').HelloConstants;

var text = 'Loading... ';
var metadata = {firstRun: true};

function setText(newText) {
  if (metadata.firstRun) {
    metadata.firstRun = false;
  }
  text = newText;
}

var HelloStore = assign({}, EventEmitter.prototype, {
  getData: function () {
    return {
      text: text,
      metadata: metadata
    };
  },

  emitChange: function (actionType) {
    this.emit(actionType);
  },

  addChangeListener: function (event, callback) {
    this.on(event, callback);
  },

  removeChangeListener: function (event, callback) {
    this.removeListener(event, callback);
  }
});

// Register callback to handle all updates
IndexDispatcher.register(function (action) {
  switch (action.actionType) {
    case HelloConstants.GET:
      setText(action.text);
      break;
    default:
    // no op
  }
  HelloStore.emitChange(action.actionType);
});

module.exports = HelloStore;
