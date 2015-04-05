'use strict';

var IndexDispatcher = require('../../util/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var actions = require('./thingConstants').ActionTypes;
var _ = require('lodash');

var things;
var metadata = {firstRun: true};

function setText(_things) {
  if (metadata.firstRun) {
    metadata.firstRun = false;
  }
  things = _things;
}
function create(response) {
  things.push(response.data);
}

function remove(response) {
  if (response.data) {
    _.remove(things, function (thing) {
      return thing.id === response.data.id;
    });
  }
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
    case actions.CREATE_THING:
      create(action.text);
      break;
    case actions.GET_THINGS:
      setText(action.text);
      break;
    case actions.DELETE_THING:
      remove(action.text);
      break;

    default:
    // no op
  }
  ThingStore.emitChange(action.actionType);
});

module.exports = ThingStore;
