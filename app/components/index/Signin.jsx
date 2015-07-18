'use strict';

import React from 'react';
import {Link} from 'react-router';
import Input from '../common/Input.jsx';
import Label from '../common/Label.jsx';
import Button from '../common/Button.jsx';
import MaterialRebindMixin from '../decorators/MaterialRebindMixin.js';

export default React.createClass({
  displayName: 'Signin',
  mixins: [MaterialRebindMixin],
  render() {
    return (
        <div className="mdl-card mdl-shadow--4dp form-card-medium">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">Please Signin</h2>
          </div>
          <form method="post" action="/signin">
            <div className="mdl-card__supporting-text">
              <fieldset>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label textfield-demo">
                  <Label htmlFor="username" text="Username" />
                  <Input name="username" type="text" required={true}/>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label textfield-demo">
                  <Label htmlFor="password" text="Password" />
                  <Input name="password" type="password" required={true}/>
                </div>
              </fieldset>
            </div>
            <div className="mdl-card__actions mdl-card--border">
              <Button type="submit" text="Login" />
            </div>
          </form>
          <div className="mdl-card__menu">
            <Link to="register">
              <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="register-icon">
                <i className="material-icons">person_add</i>
              </button>
              <div className="mdl-tooltip" htmlFor="register-icon">
                Register
              </div>
            </Link>
          </div>
        </div>
    );
  }
});
