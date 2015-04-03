'use strict';

var IndexDispatcher = require('../../util/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var things;
var metadata = {firstRun: true};

function setText(_things) {
  if (metadata.firstRun) {
    metadata.firstRun = false;
  }
  things = _things;
}
function create(/*response*/){
  // Do something with returned response
}

var ThingStore = assign({}, EventEmitter.prototype, {
  getData: function () {
    return {
      data: things,
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
    case 'createThing':
      create(action.text);
      break;
    case 'getThings':
      setText(JSON.parse(action.text));
      break;

    default:
    // no op
  }
  ThingStore.emitChange(action.actionType);
});

module.exports = ThingStore;
