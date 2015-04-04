'use strict';

var React = require('react');
var thingAction = require('./thingAction');

var ThingList = React.createClass({
  render: function () {
    if (!this.props.things || this.props.things.length === 0) {
      return null;
    }
    return (
        <ul>
        {this.props.things.map(function (thing) {
          return <ThingItem item={thing} />
        }.bind(this))}
        </ul>
    )
  }
});

var ThingItem = React.createClass({
  _delete: function () {
    thingAction.del(this.props.item.id);
  },
  render: function () {
    return (
        <li key={this.props.item.id}>
          <span>{this.props.item.name}
            <span onDoubleClick={this._delete}>Delete</span>
          </span>

        </li>
    )
  }
});

module.exports = ThingList;
