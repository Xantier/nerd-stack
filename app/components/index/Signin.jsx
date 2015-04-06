'use strict';

import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render() {
    return (
        <div>
          <form method="post" action="/signin">
            <input name="username" type="username" placeholder="username" required={true}/>
            <input name="password" type="password" placeholder="Password" required={true}/>
            <input type="submit">
              Sign In
            </input>
          </form>
          <ul>
            <li>
              <Link to="register">Register</Link>
            </li>
          </ul>
        </div>
    );
  }
});
