var Dispatcher = require('../../util/fluxDispatcher');
var request = require('superagent');

var HelloAction = {

   create: function (text) {
      Dispatcher.dispatch({
         actionType: 'create',
         text: text
      });
   },

   getData: () => {
      let response;
      //return 'I called this value from the DB';
      request.get('/api/user')
            .set('Accept', 'application/json')
            .set('port', 3000)
            .end(function (err, res) {
               if (res.ok) {
                  response = JSON.stringify(res.text);
                  Dispatcher.dispatch({
                     actionType: 'get',
                     text: response
                  });
               } else {
                  response = res.text;
                  Dispatcher.dispatch({
                     actionType: 'get',
                     text: 'SOMETHING WENT WRONG \\o/ ' + response
                  });
               }
            });
   }
};

module.exports = HelloAction;