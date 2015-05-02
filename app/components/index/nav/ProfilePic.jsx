'use strict';

import React from 'react';
import ProfilePic from './ProfilePic.jsx';
import {Link} from 'react-router';

export default React.createClass({
  displayName: 'ProfilePic',
  propTypes: {
    link: React.PropTypes.object.isRequired
  },
  render() {
    const userImg = this.props.link.url || 'user.png';
    const imgStyle = {background: 'url(' + userImg + ') no-repeat'};
    return (
        <Link to={this.props.link.link}>
          <div className="profile-pic-img" style={imgStyle}></div>
        </Link>
    );
  }
});
