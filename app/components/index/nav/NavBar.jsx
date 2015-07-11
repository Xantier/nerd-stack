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
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <div className="mdl-layout-spacer"></div>
            {
              this.props.links.map(function (link) {
              return <NavBarLink key={link.key} link={link} />;
            })}
          </div>
        </header>
    );
  }
});
