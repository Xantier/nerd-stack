'use strict';

import React from 'react';

export default React.createClass({
  displayName: 'Label',
  propTypes: {
    htmlFor: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired
  },
  render() {
    return (
        <label className="mdl-textfield__label" htmlFor={this.props.htmlFor}>{this.props.text}</label>
    );
  }
});
