'use strict';

import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  displayName: 'ProfilePic',
  propTypes: {
    link: React.PropTypes.object.isRequired
  },
  render() {
    const userImg = this.props.link.url || 'user.png';
    return (
        <Link to={this.props.link.link} className="mdl-navigation__link">
          <img src={userImg} className="cropped-round"/>
        </Link>
    );
  }
});
