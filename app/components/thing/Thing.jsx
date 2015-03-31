'use strict';

var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {value: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    var value = this.state.value;
    return (
        <input type="text" value={value} onChange={this.handleChange} />
    )
  }
});