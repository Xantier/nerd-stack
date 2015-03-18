'use strict';

var React = require('react');
var Router = require('react-router');
var { Route, NotFoundRoute } = Router;

var Index = require('./Index.jsx');
var Home = require('./Home.jsx');
var Hello = require('./Hello.jsx');
var NotFound = require('./NotFound.jsx');

var routes = (
      <Route handler={Index}>
         <Route name="home" path="/" handler={Home} />
         <Route name="hello" path="/hello/:name" handler={Hello} />
         <NotFoundRoute handler={NotFound} />
      </Route>
);

Router.run(routes, function (Handler) {
   React.render(<Handler />, document.body);
});