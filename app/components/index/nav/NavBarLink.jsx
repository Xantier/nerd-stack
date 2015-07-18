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
            <ProfilePic link={this.props.link} />
        );
      case 'Logout':
        return (
            <a href={link} className="mdl-navigation__link">
              <span>{key}</span>
            </a>
        );
      default:
        return (
            <Link to={link} className="mdl-navigation__link">
              <span>{key}</span>
            </Link>
        );
    }

  }
})
