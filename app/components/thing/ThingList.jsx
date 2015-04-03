'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function () {
    console.log(this.props.things);
    if (!this.props.things || this.props.things.length===0) {
      return null;
    }
    return (
        <ul>
        {this.props.things.map(function(thing){
          return <li key={thing.id}>{thing.name}</li>
        })}
        </ul>
    )
  }
});