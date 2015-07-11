'use strict';

import React from 'react';
import ProfilePic from './ProfilePic.jsx';
import {Link} from 'react-router';

export default React.createClass({
  displayName: 'NavBarLink',
  propTypes: {
    link: React.PropTypes.object.isRequired
  },
  render() {
    const {key, link} = this.props.link;
    switch (key) {
      case 'Profile':
        return (
            <li className="mdl-layout-title">
              <ProfilePic link={this.props.link} />
            </li>
        );
      case 'Logout':
        return (
            <li>
              <a href={link}>
                <span>{key}</span>
              </a>
            </li>
        );
      default:
        return (
            <li className="mdl-navigation__link">
              <Link to={link}>
                <span>{key}</span>
              </Link>
            </li>
        );
    }

  }
})
