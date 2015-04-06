'use strict';

const React = require('react');
const Router = require('react-router');
const { Link } = Router;

module.exports = React.createClass({
  render: function () {
    return (
        <div className="home">
          <h2>Home</h2>
          <ul>
            <li>
              <Link to="hello" params={{name: "world"}}>Hello World</Link>
            </li>
          </ul>
        </div>
    );
  }
});