'use strict';

import React from 'react';
import { StyleResolverMixin, BrowserStateMixin } from 'radium';

const inputStyles = {
  background: '#5ff1f1',
  border: 'none',
  fontSize: '16px',
  height: '35px',
  margin: 0,
  outline: 0,
  padding: '15px, 0px, 15px, 0px',
  width: '100%',
  backgroundColor: '#bebebe',
  color: '#8a97a0',
  boxShadow: '0 1px 0 rgba(0,0,0,0.03) inset',
  marginBottom: '30px',
  paddingRight: '70px',
  transition: 'padding .25s',
  states: [
    { focus: {
      background: '#55eeee',
      border: '1px solid #555',
      boxShadow: '0 0 0 3px #eee, 0 0 0 6px #0074D9',
      outline: 'none'
    }}
]
};

export default React.createClass({
  displayName: 'Input',
  propTypes: {
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    required: React.PropTypes.bool,
    onChange: React.PropTypes.func
  },
  mixins: [StyleResolverMixin, BrowserStateMixin],
  render() {
    return (
        <input style={this.buildStyles(inputStyles)} id={this.props.name} name={this.props.name}
            type={this.props.type} placeholder={this.props.placeholder}
            required={this.props.required} onChange={this.props.onChange} />
    );
  }
});
