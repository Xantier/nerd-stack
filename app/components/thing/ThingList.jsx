'use strict';

var React = require('react');

var ThingList = React.createClass({
  render: function () {
    if (!this.props.things || this.props.things.length === 0) {
      return null;
    }
    return (
        <ul>
        {this.props.things.map(function (thing) {
          return <li key={thing.id}>{thing.name}</li>
        })}
        </ul>
    )
  }
});

module.exports = ThingList;
