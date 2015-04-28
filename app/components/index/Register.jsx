'use strict';

import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  displayName: 'Register',
  render() {
    return (
        <div>
          <form method="post" action="/register">
            <input name="username" type="username" placeholder="username" required={true}/>
            <input name="password" type="password" placeholder="Password" required={true} />
            <input name="password2" type="password2" placeholder="Password again" required={true} />
            <input type="submit">
              Register
            </input>
          </form>
          <ul>
            <li>
              <Link to="signin">Sign In</Link>
            </li>
          </ul>
        </div>
    );
  }
});
