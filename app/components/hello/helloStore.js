'use strict';

var IndexDispatcher = require('../../util/fluxDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var request = require('superagent');
var CHANGE_EVENT = 'change';

function create(text) {
   console.log('Calling API to create something. Text received: ' + text);
}

var HelloStore = assign({}, EventEmitter.prototype, {

   get: function () {
      let response;
      return 'I called this value from the DB';
/*      request.post('/api/user')
            .set('Accept', 'application/json')
            .set('port', 3000)
            .end(function (err, res) {
               console.log(res);
               console.log(err);
               if (res.ok) {
                  response = JSON.stringify(res.body);
                  alert('yay got ' + response);
                  return response;
               } else {
                  alert('Oh no! error ' + res.text);
                  response = res.text;
                  return response;
               }
            });*/
   },

   emitChange: function () {
      this.emit(CHANGE_EVENT);
   },

   /**
    * @param {function} callback
    */
   addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
   },

   /**
    * @param {function} callback
    */
   removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
   }
});

// Register callback to handle all updates
IndexDispatcher.register(function (action) {
   switch (action.actionType) {
      case 'create':
         create(action.text);
         HelloStore.emitChange();
         break;

      default:
      // no op
   }
});

module.exports = HelloStore;