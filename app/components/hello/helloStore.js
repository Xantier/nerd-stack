'use strict';

var IndexDispatcher = require('../../util/fluxDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var text = 'Loading... ';
var CHANGE_EVENT = 'change';

function create(text) {
   console.log('Waaat, Something has been created. Updating view now with ' + text);
}

function setText(newText) {
   text = newText;
}

var HelloStore = assign({}, EventEmitter.prototype, {
   getData: function () {
      return text;
   },

   emitChange: function () {
      this.emit('get');
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
      case 'create':
         create(action.text);
         break;
      case 'get':
         setText(action.text);
         break;

      default:
      // no op
   }
   HelloStore.emitChange();
});

module.exports = HelloStore;