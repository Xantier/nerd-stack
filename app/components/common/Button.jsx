'use strict';

import React from 'react';

export default React.createClass({
  displayName: 'Button',
  propTypes: {
    text: React.PropTypes.string.isRequired,
    href: React.PropTypes.string,
    type: React.PropTypes.string,
    clickAction: React.PropTypes.func
  },
  render() {
    return (
        <a href={this.props.href} onClick={this.props.clickAction}>
          <button type={this.props.type} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
          {this.props.text}
          </button>
        </a>
    );
  }
});
