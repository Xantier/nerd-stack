'use strict';

import React from 'react';
import {Link} from 'react-router';
import Input from '../common/Input.jsx';
import Label from '../common/Label.jsx';
import Button from '../common/Button.jsx';

export default React.createClass({
  displayName: 'Signin',
  render() {
    return (
        <div className="signin-form-container">
          <form method="post" action="/signin">
            <div className="form-header">
              <h1>Please Signin</h1>
            </div>
            <div className="form-content">
              <Label htmlFor="username" text="Username" />
              <Input name="username" type="username" placeholder="Username" required={true}/>
              <Label htmlFor="password" text="Password" />
              <Input name="password" type="password" placeholder="Password" required={true}/>
            </div>
            <div className="form-footer">
              <Link to="register">
                <span className="submit-button-secondary">Register</span>
              </Link>
              <Button type="submit" text="Login" />
            </div>
          </form>
        </div>
    );
  }
});
