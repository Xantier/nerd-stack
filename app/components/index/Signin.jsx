'use strict';

import React from 'react';
import {Link} from 'react-router';
import Input from '../common/Input.jsx';
import Label from '../common/Label.jsx';
import Button from '../common/Button.jsx';

export default React.createClass({
  displayName: 'Signin',
  componentDidUpdate: function () {
    componentHandler.upgradeDom();
  },
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
              <Link to="register">
                <Button type="button" text="Register" />
              </Link>
              <Button type="submit" text="Login" />
            </div>
          </form>
        </div>
    );
  }
});
