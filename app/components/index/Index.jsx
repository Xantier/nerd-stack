'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';
import LogoutButton from './LogoutButton.jsx';
import NavBar from './Nav/NavBar.jsx';

export default React.createClass({
  displayName: 'Index',
  propTypes: {
    loggedIn: React.PropTypes.bool.isRequired,
    context: React.PropTypes.object
  },
  childContextTypes: {
    data: React.PropTypes.object
  },
  getChildContext() {
    if (this.props.context) {
      return {
        data: this.props.context.data
      };
    }
    return null;
  },
  render() {
    let logoutButton;
    let links = [
      {key: 'Index', link: '/'}
    ];
    if (this.props.loggedIn) {
      logoutButton = <LogoutButton />;
      links.unshift({key: 'Profile', link: '/profile'});
      links.push({key: 'Logout', link: '/logout'});
    } else {
      links.push({key: 'Register', link: '/register'}, {key: 'Signin', link: '/signin'});
    }
    return (
        <div>
          <NavBar links={links}/>
          <div>
            <h1>Welcome</h1>
            <RouteHandler {...this.props}/>
          {logoutButton}
          </div>
        </div>
    );
  }
});
