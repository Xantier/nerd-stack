'use strict';

import React from 'react';

const labelStyles = {
  display: 'block',
  marginBottom: '8px'
};

export default React.createClass({
  displayName: 'Label',
  propTypes: {
    htmlFor: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired
  },
  render() {
    return (
        <label htmlFor={this.props.htmlFor}>{this.props.text}</label>
    );
  }
});
