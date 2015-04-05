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
          return <ThingItem item={thing}  key={thing.id}/>
        }.bind(this))}
        </ul>
    )
  }
});

var ThingItem = React.createClass({
  _delete: function (e) {
    e.preventDefault();
    thingAction.del(this.props.item.id);
  },
  render: function () {
    return (
        <li>
          <span>{this.props.item.name}
            <a  onClick={this._delete} href={"/API/thing/" + this.props.item.id + "?_method=DELETE"}>
              Delete thing
            </a>
          </span>
        </li>
    )
  }
});

module.exports = ThingList;
