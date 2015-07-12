'use strict';

import React from 'react';

export default React.createClass({
  displayName: 'Input',
  propTypes: {
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    required: React.PropTypes.bool,
    onChange: React.PropTypes.func
  },
  render() {
    return (
        <input className="mdl-textfield__input" id={this.props.name} name={this.props.name}
            type={this.props.type} placeholder={this.props.placeholder}
            required={this.props.required} onChange={this.props.onChange} />
    );
  }
});
