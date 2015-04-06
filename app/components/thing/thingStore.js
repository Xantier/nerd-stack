'use strict';

const IndexDispatcher = require('../../util/dispatcher');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');
const ThingConstants = require('./thingConstants').ThingConstants;
const _ = require('lodash');

let things;
let metadata = {firstRun: true};

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

function update(response) {
  if (response.data) {
    _.remove(things, function (thing) {
      return thing.id === response.data.id;
    });
    things.push(response.data);
  }
}

const ThingStore = assign({}, EventEmitter.prototype, {
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
    case ThingConstants.CREATE_THING:
      create(action.text);
      break;
    case ThingConstants.GET_THINGS:
      setText(action.text);
      break;
    case ThingConstants.DELETE_THING:
      remove(action.text);
      break;
    case ThingConstants.UPDATE_THING:
      update(action.text);
      break;

    default:
    // no op
  }
  ThingStore.emitChange(action.actionType);
});

module.exports = ThingStore;
