'use strict';

import React from 'react';
import color from 'color';
import { StyleResolverMixin, BrowserStateMixin } from 'radium';

const navContainerStyles = {};

const ulStyles = {
  listStyle: 'none',
  display: 'inline-block',
  margin: 0,
  padding: 0
};

const liStyles = {
  float: 'left',
  display: 'inline',
  paddingRight: '20px',
  cursor: 'pointer',
  backgroundColor: '#eee',
  color: '#7B8585',
  transition: '0.3s',
  states: [
    {
      hover: {
        background: color('#0074d9').lighten(0.2).hexString()
      }
    },
    {
      focus: {
        boxShadow: '0 0 0 3px #eee, 0 0 0 6px #0074D9',
        outline: 'none'
      }
    }
  ]
};

export default React.createClass({
  displayName: 'NavBar',
  propTypes: {
    links: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },
  mixins: [StyleResolverMixin, BrowserStateMixin],
  render() {
    return (
        <div>
          <ul style={this.buildStyles(ulStyles)}>{ this.props.links.map(function (link) {
            return (
                <li key={link.key} style={this.buildStyles(liStyles)}>
                  <a href={link.link}>{link.key}</a>
                </li>
            );
          }, this)}
          </ul>
        </div>
    );
  }
});
