'use strict';

var React = require('react');
var thingStore = require('./thingStore');
var thingAction = require('./thingAction');

module.exports = React.createClass({
  getInitialState: function() {
    return thingStore.getData();
  },
  _handleChange: function(event) {
    thingAction.create({value: event.target.value});
  },
  render: function() {
    var value = this.state.value;
    return (
        <input type="text" value={value} onBlur={this._handleChange} />
    )
  }
});