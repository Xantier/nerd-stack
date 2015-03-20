var Dispatcher = require('../../util/fluxDispatcher');

var HelloActions = {

   create: function(text) {
      Dispatcher.dispatch({
         actionType: 'create',
         text: text
      });
   }
};

module.exports = HelloActions;