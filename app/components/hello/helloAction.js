var Dispatcher = require('../../util/fluxDispatcher');
var request = require('superagent');

function retrieveXhrData(cb) {
   let response;
   request.get('/api/user')
         .set('Accept', 'application/json')
         .set('port', 3000)
         .end(function (err, res) {
            if (res.ok) {
               response = JSON.stringify(res.text);
            } else {
               response = 'SOMETHING WENT WRONG \\o/ ' + res.text;
            }
            cb('get', response);
         });
}
function dispatch(actionType, text) {
   Dispatcher.dispatch({
      actionType: actionType,
      text: text
   });
}
var HelloAction = {

   create: function (text) {
      dispatch('create', text);
   },

   getData: () => {
      if(typeof window !== 'undefined') {
         retrieveXhrData(dispatch);
      }else{
         dispatch('get', 'Server Rendered Data');
      }

   }
};

module.exports = HelloAction;