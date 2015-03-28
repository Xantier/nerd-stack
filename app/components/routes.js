'use strict';

var React = require('react');
var Router = require('react-router');
var { Route, NotFoundRoute } = Router;

var Index = require('./index/Index.jsx');
var Home = require('./home/Home.jsx');
var Hello = require('./hello/Hello.jsx');
var NotFound = require('./NotFound.jsx');

module.exports = () => {
  return [
    <Route name="index" handler={Index}>
      <Route name="home" path="/" handler={Home} />
      <Route name="hello" path="/hello/:name" handler={Hello} />
    </Route>,
    <NotFoundRoute name="not-found" handler={NotFound} />
  ];
};
