// Imports
var React = require('react');
var Router = require('react-router');
var reactRouter = require('./reactrouter');
var all = require('when/keys').all;
var cache = require('../public/cache');
var indexHTML = require('fs').readFileSync(__dirname+'/../views/index.html').toString();

var fetchData = module.exports = (token, routerState) => {
   var { params, query } = routerState;
   return all(routerState.routes.filter((route) => {
      return route.handler.fetchData;
   }).reduce((promises, route) => {
      promises[route.name] = route.handler.fetchData(token, params, query);
      return promises;
   }, {}));
};

module.exports = (req, token, cb) => {
   var path = req.baseUrl;
   var htmlRegex = /¡HTML!/;
   var dataRegex = /¡DATA!/;

   var router = Router.create({
      routes: reactRouter(token),
      location: path,
      onAbort: function (redirect) {
         cb({redirect});
      },
      onError: function (err) {
         console.log('Routing Error');
         console.log(err);
      }
   });

   router.run((Handler, state) => {
      if (state.routes[0].name === 'not-found') {
         var html = React.renderToStaticMarkup(<Handler/>);
         cb({notFound: true}, html);
         return;
      }
      fetchData(token, state).then((data) => {
         var clientHandoff = { token, data: cache.clean(token) };
         var html = React.renderToString(<Handler data={data} />);
         var output = indexHTML.
               replace(htmlRegex, html).
               replace(dataRegex, JSON.stringify(clientHandoff));
         cb(null, output, token);
      });
   });
};