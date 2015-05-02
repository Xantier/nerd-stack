'use strict';

import React from 'react';
import color from 'color';

export default React.createClass({
  displayName: 'Submit',
  propTypes: {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired
  },
  render() {
    return (
        <input className="submit-button" name={this.props.name} value={this.props.value} type="submit" />
    );
  }
});
