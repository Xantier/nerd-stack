'use strict';

const React = require('react');
const Router = require('react-router');
const { RouteHandler, Link } = Router;

module.exports = React.createClass({
  render: function () {
    return (
        <div className="container">
          <h1>Welcome</h1>
          <RouteHandler {...this.props}/>
          <a href="/logout">logout</a>
        </div>
    );
  }
});