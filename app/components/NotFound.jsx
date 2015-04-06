'use strict';

const React = require('react');
const Router = require('react-router');
const { Link } = Router;

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
