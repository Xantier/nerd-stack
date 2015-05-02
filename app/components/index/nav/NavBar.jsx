'use strict';

import React from 'react';
import NavBarLink from './NavBarLink.jsx';

export default React.createClass({
  displayName: 'NavBar',
  propTypes: {
    links: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },
  render() {
    return (
        <div className="navbar-container">
          <ul>{ this.props.links.map(function (link) {
            return <NavBarLink key={link.key} link={link} />;
          })}
          </ul>
        </div>
    );
  }
});
