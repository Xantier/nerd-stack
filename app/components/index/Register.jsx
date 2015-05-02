'use strict';

import React from 'react';
import {Link} from 'react-router';
import Label from '../common/Label.jsx';
import Input from '../common/Input.jsx';
import Submit from '../common/Submit.jsx';

export default React.createClass({
  displayName: 'Register',
  render() {
    return (
        <div className="register-form-container">
          <form method="post" action="/register">
            <div className="form-header">
              <h1>Please Register</h1>
              <span>Please insert your desired username and password.
                At the moment validations are non existant for username/password length, type etc.</span>
            </div>
            <div className="form-content">
              <Label htmlFor="username" text="Username" />
              <Input name="username" type="username" placeholder="Username" required={true} />
              <Label htmlFor="password" text="Password" />
              <Input name="password" type="password" placeholder="Password" required={true} />
              <Label htmlFor="password2" text="Password Again" />
              <Input name="password2" type="password" placeholder="Password Again" required={true} />
            </div>
            <div className="form-footer">
              <Link to="signin">
                <span className="submit-button-secondary">Sign in</span>
              </Link>
              <Submit name="Register" value="Register" />
            </div>
          </form>
        </div>
    );
  }
});
