'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';
import NavBar from './nav/NavBar.jsx';

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
    let links = [];
    if (this.props.loggedIn) {
      links.unshift(
          {key: 'Profile', link: '/profile'});
      links.push(
          {key: 'Index', link: '/'},
          {key: 'Logout', link: '/logout'});
    } else {
      links.push(
          {key: 'Register', link: '/register'},
          {key: 'Signin', link: '/signin'});
    }
    return (
        <div className="mdl-layout__container">
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <NavBar links={links} />
            <main className="mdl-layout__content">
              <div className="page-content">
                <RouteHandler {...this.props}/>
              </div>
            </main>
          </div>
        </div>
    );
  }
});
