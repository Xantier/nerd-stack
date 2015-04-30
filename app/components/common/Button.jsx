'use strict';

import React from 'react';
import { StyleResolverMixin, BrowserStateMixin } from 'radium';

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
    text: React.PropTypes.string.isRequired
  },
  mixins: [StyleResolverMixin, BrowserStateMixin],
  render() {
    return (
        <a a href="/logout">
          <button {...this.getBrowserStateEvents()} style={this.buildStyles(styles)}>
          {this.props.text}
          </button>
        </a>
    );
  }
});
