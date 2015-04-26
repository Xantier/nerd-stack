'use strict';

import React from 'react';
import NavBarLink from './NavBarLink.jsx';
import { StyleResolverMixin } from 'radium';

const navContainerStyles = {
  float: 'left',
  width: '100%',
  backgroundColor: '#f96a6a',
  margin: '0px',
  padding: '0px'
};

const ulStyles = {
  listStyle: 'none',
  display: 'block',
  lineHeight: 1,
  backgroundColor: '#f96a6a',
  margin: '0px',
  padding: '0px',
  zoom: 1
};

export default React.createClass({
  displayName: 'NavBar',
  propTypes: {
    links: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },
  mixins: [StyleResolverMixin],
  render() {
    return (
        <div style={this.buildStyles(navContainerStyles)}>
          <ul style={this.buildStyles(ulStyles)}>{ this.props.links.map(function (link) {
            return <NavBarLink key={link.key} link={link} />;
          })}
          </ul>
        </div>
    );
  }
});
