'use strict';

var React = require('react');
var {Link} = require('react-router');

module.exports = React.createClass({
  render: function () {
    return (
        <div>
          <form method="post" action="/register">
            <input name="username" type="username" placeholder="username" required={true}/>
            <input name="password" type="password" placeholder="Password" required={true}/>
            <input type="submit">
              Sign In
            </input>
          </form>
          <Link to="register">Sign In</Link>
        </div>
    )
  }
});
