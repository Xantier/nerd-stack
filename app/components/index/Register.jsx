'use strict';

import React from 'react';
import {Link} from 'react-router';
import Label from '../common/Label.jsx';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import MaterialRebindMixin from '../decorators/MaterialRebindMixin.js';

export default React.createClass({
  displayName: 'Register',
  mixins: [MaterialRebindMixin],
  render() {
    return (
        <div className="mdl-card mdl-shadow--4dp form-card-wide">
          <div className="mdl-card__title">
            <div className="mdl-card__title-text">
              <h2>Please Register</h2>
              <div id="register-info-tooltip" className="icon material-icons">info</div>
              <div className="mdl-tooltip" htmlFor="register-info-tooltip">
                Please insert your desired username and password.
                <br />
                At the moment validations are non existant for username/password length, type etc.
              </div>
            </div>
          </div>
          <form method="post" action="/register">
            <div className="mdl-card__supporting-text">
              <fieldset>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label textfield-demo">
                  <Label htmlFor="username" text="Username" />
                  <Input name="username" type="username" required={true} />
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label textfield-demo">
                  <Label htmlFor="password" text="Password" />
                  <Input name="password" type="password" required={true} />
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label textfield-demo">
                  <Label htmlFor="password2" text="Password Again" />
                  <Input name="password2" type="password" required={true} />
                </div>
              </fieldset>
            </div>
            <div className="mdl-card__actions mdl-card--border">
              <Button type="submit" text="Register" />
            </div>
          </form>
          <div className="mdl-card__menu">
            <Link to="signin">
              <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="signin-icon">
                <i className="material-icons">account_circle</i>
              </button>
              <div className="mdl-tooltip" htmlFor="signin-icon">
                Signin
              </div>
            </Link>
          </div>
        </div>
    );
  }
})
    ;
