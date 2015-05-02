'use strict';

import React from 'react';

export default React.createClass({
  displayName: 'Button',
  propTypes: {
    text: React.PropTypes.string.isRequired,
    href: React.PropTypes.string
  },
  render() {
    return (
        <a href={this.props.href}>
          <button>
          {this.props.text}
          </button>
        </a>
    );
  }
});
