'use strict';

var React = require('react');
var Router = require('react-router');
var { Link } = Router;

module.exports = React.createClass({
  render: function () {
    return (
        <div className="hello">
          <h2>Path not found :(</h2>
          <ul>
            <li>
              <Link to="home">Go Home</Link>
            </li>
          </ul>
        </div>
    );
  }
});
