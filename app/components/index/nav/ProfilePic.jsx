'use strict';

import React from 'react';
import ProfilePic from './ProfilePic.jsx';

const aStyles = {
  color: '#ffffff',
  fontSize: '14px',
  position: 'relative',
  transition: 'color .25s'
};

let imgStyles = {
  marginLeft: '20px',
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  backgroundColor: '#f96a6a',
  states: [
    {
      hover: {
        background: '#fd8080',
        color: '#000000'
      }
    },
    {
      focus: {
        boxShadow: '0 0 0 3px #eee, 0 0 0 6px #fb7575',
        outline: 'none'
      }
    }
  ]
};

export default React.createClass({
  displayName: 'ProfilePic',
  propTypes: {
    link: React.PropTypes.object.isRequired
  },
  render() {
    const userImg = this.props.link.url || 'user.png';
    imgStyles.background = `url(${userImg}) no-repeat`;
    return (
        <a href={this.props.link.link} >
          <div></div>
        </a>
    );
  }
});
