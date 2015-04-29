'use strict';

import React from 'react';
import { StyleResolverMixin } from 'radium';

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
  mixins: [StyleResolverMixin],
  render() {
    return (
        <label style={this.buildStyles(labelStyles)} htmlFor={this.props.htmlFor}>{this.props.text}</label>
    );
  }
});
