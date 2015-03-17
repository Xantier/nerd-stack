'use strict';

var React = require('react');
var { DefaultRoute, Route, NotFoundRoute } = require('react-router');
var App = require('./components/App.jsx');
var Home = require('./components/Home.jsx');
var Hello = require('./components/Hello.jsx');

module.exports = (token) => {
   return [
         <Route handler={App}>
            <Route name="home" path="/" handler={Home} />
            <Route name="hello" path="/hello/:name" handler={Hello} />
         </Route>
   ];
};