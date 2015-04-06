'use strict';

const React = require('react');
const Router = require('react-router');
const { Route, NotFoundRoute } = Router;

const Index = require('./index/Index.jsx');
const Signin = require('./index/Signin.jsx');
const Register = require('./index/Register.jsx');
const Home = require('./home/Home.jsx');
const Hello = require('./hello/Hello.jsx');
const NotFound = require('./NotFound.jsx');

module.exports = () => {
  return [
    <Route name="index" handler={Index}>
      <Route name="signin" path="/signin" handler={Signin}/>
      <Route name="register" path="/register" handler={Register}/>
      <Route name="home" path="/" handler={Home} />
      <Route name="hello" path="/hello/:name" handler={Hello} />
    </Route>,
    <NotFoundRoute name="not-found" handler={NotFound} />
  ];
};
