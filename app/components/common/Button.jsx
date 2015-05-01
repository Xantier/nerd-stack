'use strict';

import React from 'react';

const styles = {
  padding: '5px 10px',
  border: 0,
  borderRadius: 4,
  color: '#fff',
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: 700,
  backgroundColor: '#4bc970'
};

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
