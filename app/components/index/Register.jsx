'use strict';

const React = require('react');
const {Link} = require('react-router');

module.exports = React.createClass({
  render: function () {
    return (
        <div>
          <form method="post" action="/register">
            <input name="username" type="username" placeholder="username" required={true}/>
            <input name="password" type="password" placeholder="Password" required={true}/>
            <input type="submit">
              Register
            </input>
          </form>
          <Link to="signin">Sign In</Link>
        </div>
    )
  }
});
