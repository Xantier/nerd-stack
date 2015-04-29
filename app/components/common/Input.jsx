'use strict';

import React from 'react';
import { StyleResolverMixin } from 'radium';

const inputStyles = {
  background: 'rgba(255,255,255,0.1)',
  border: 'none',
  fontSize: '16px',
  height: 'auto',
  margin: 0,
  outline: 0,
  padding: '15px, 0px, 15px, 0px',
  width: '100%',
  backgroundColor: '#e8eeef',
  color: '#8a97a0',
  boxShadow: '0 1px 0 rgba(0,0,0,0.03) inset',
  marginBottom: '30px'
};

export default React.createClass({
  displayName: 'Input',
  propTypes: {
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool.isRequired
  },
  mixins: [StyleResolverMixin],
  render() {
    return (
        <input style={this.buildStyles(inputStyles)} name={this.props.name}
            type={this.props.type} placeholder={this.props.placeholder} required={this.props.required}/>
    );
  }
});
