'use strict';

import React from 'react';
import color from 'color';
import ProfilePic from './ProfilePic.jsx';
import { StyleResolverMixin, BrowserStateMixin } from 'radium';

const liStyles = {
  float: 'left',
  display: 'inline-block',
  paddingRight: '20px',
  cursor: 'pointer',
  backgroundColor: '#f96a6a'
};

const aStyles = {
  fontFamily: 'sans-serif',
  textDecoration: 'none',
  color: '#ffffff',
  display: 'block',
  padding: '15px 25px',
  fontWeight: 700,
  textTransform: 'uppercase',
  fontSize: '14px',
  position: 'relative',
  transition: 'color .25s',
  states: [
    {
      hover: {
        background: color('#56f4f4').lighten(0.2).hexString(),
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
  displayName: 'NavBarLink',
  propTypes: {
    link: React.PropTypes.object.isRequired
  },
  mixins: [StyleResolverMixin, BrowserStateMixin],
  render() {
    if (this.props.link.key === 'Profile') {
      return (
          <li style={this.buildStyles(liStyles)}>
            <ProfilePic link={this.props.link} />
          </li>
      );
    }
    return (
        <li style={this.buildStyles(liStyles)}>
          <a href={this.props.link.link} {...this.getBrowserStateEvents()} style={this.buildStyles(aStyles)} >{this.props.link.key}</a>
        </li>
    );
  }
});
