'use strict';

var React = require('react');
var Router = require('react-router');
var { Route, NotFoundRoute } = Router;

var Index = require('./components/index.jsx');
var Home = require('./components/home.jsx');
var Hello = require('./components/hello/hello.jsx');
var NotFound = require('./components/notFound.jsx');

module.exports = () => {
   return [
      <Route name="index" handler={Index}>
         <Route name="home" path="/" handler={Home} />
         <Route name="hello" path="/hello/:name" handler={Hello} />
      </Route>,
      <NotFoundRoute name="not-found" handler={NotFound} />
   ];
};