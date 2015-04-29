'use strict';

import React from 'react';
import { StyleResolverMixin } from 'radium';

const submitStyles = {
  padding: '19px 39px 18px 39px',
  color: '#FFF',
  backgroundColor: '#4bc970',
  fontSize: '18px',
  textAlign: 'center',
  fontStyle: 'normal',
  borderRadius: '5px',
  width: '100%',
  border: '1px solid #3ac162',
  borderWidth: '1px 1px 3px',
  boxShadow: '0 -1px 0 rgba(255,255,255,0.1) inset',
  marginBottom: '10px'
};

export default React.createClass({
  displayName: 'Submit',
  propTypes: {
    name: React.PropTypes.string.isRequired
  },
  mixins: [StyleResolverMixin],
  render() {
    return (
        <input style={this.buildStyles(submitStyles)} name={this.props.name} value={this.props.name} type="submit" />
    );
  }
});
