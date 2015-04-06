'use strict';

const IndexDispatcher = require('../../util/dispatcher');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');
const HelloConstants = require('./helloConstants').HelloConstants;

let text = 'Loading... ';
let metadata = {firstRun: true};

function setText(newText) {
  if (metadata.firstRun) {
    metadata.firstRun = false;
  }
  text = newText;
}

const HelloStore = assign({}, EventEmitter.prototype, {
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
