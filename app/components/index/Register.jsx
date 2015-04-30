'use strict';

import React from 'react';
import {Link} from 'react-router';
import { StyleResolverMixin } from 'radium';
import Label from '../common/Label.jsx';
import Input from '../common/Input.jsx';
import Submit from '../common/Submit.jsx';

const formStyles = {
  float: 'left',
  maxWidth: '300px',
  margin: '30px auto',
  padding: '10px 20px',
  background: '#d8d8d8',
  borderRadius: '8px'
};

export default React.createClass({
  displayName: 'Register',
  mixins: [StyleResolverMixin],
  render() {
    return (
        <div>
          <form style={this.buildStyles(formStyles)} method="post" action="/register">
            <fieldset>
              <legend>Register</legend>
              <Label htmlFor="username" text="Username" />
              <Input name="username" type="username" placeholder="Username" required={true} />
              <Label htmlFor="password" text="Password" />
              <Input name="password" type="password" placeholder="Password" required={true} />
              <Label htmlFor="password2" text="Password Again" />
              <Input name="password2" type="password" placeholder="Password Again" required={true} />
              <Submit name="Register" />
            </fieldset>
          </form>
        </div>
    );
  }
});
