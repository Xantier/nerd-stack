'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';
import LogoutButton from './LogoutButton.jsx';

export default React.createClass({
  displayName: 'Index',
  propTypes: {
    loggedIn: React.PropTypes.bool.isRequired,
    context: React.PropTypes.object
  },
  childContextTypes: {
    data: React.PropTypes.object
  },
  getChildContext: function () {
    if (this.props.context) {
      return {
        data: this.props.context.data
      };
    }
    return null;
  },
  render() {
    let logoutButton;
    if (this.props.loggedIn) {
      logoutButton = <LogoutButton />;
    }
    return (
        <div className="container">
          <h1>Welcome</h1>
          <RouteHandler {...this.props}/>
          {logoutButton}
        </div>
    );
  }
});
