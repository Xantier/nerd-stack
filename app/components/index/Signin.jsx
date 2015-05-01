'use strict';

import React from 'react';
import {Link} from 'react-router';
import Input from '../common/Input.jsx';
import Label from '../common/Label.jsx';
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
  displayName: 'Signin',
  render() {
    return (
        <div>
          <form method="post" action="/signin">
            <Label htmlFor="username" text="Username" />
            <Input name="username" type="username" placeholder="username" required={true}/>
            <Label htmlFor="password" text="Password" />
            <Input name="password" type="password" placeholder="Password" required={true}/>
            <Submit name="Signin" />
          </form>
        </div>
    );
  }
});
