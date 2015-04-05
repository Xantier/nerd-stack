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
          return <ThingItem item={thing} key={thing.id} _modify={this.props._modify} />
        }.bind(this))}
        </ul>
    )
  }
});

var ThingItem = React.createClass({
  getInitialState: function () {
    return {editing: false};
  },
  _delete: function (e) {
    e.preventDefault();
    thingAction.del(this.props.item.id);
  },
  _enableEditMode: function () {
    this.setState({editing: true});
  },
  _modify: function (e) {
    e.preventDefault();
    this.props._modify(this.props.item.id, {name: this.state.name});
    this.setState({editing: false});
  },
  _setChangedText: function (event) {
    this.setState({name: event.target.value});
  },
  render: function () {
    if (this.state.editing) {
      return (
          <form action="/API/thing?_method=PUT" method="post" onSubmit={this._modify}>
            <input name="name" type="text" onChange={this._setChangedText} />
            <button>Update</button>
          </form>
      )
    }
    return (
        <li ref="itemContainer">
          <span ref="thingSpan" onContextMenu={this._enableEditMode}>{this.props.item.name}
            <a  onClick={this._delete} href={"/API/thing/" + this.props.item.id + "?_method=DELETE"}>
              Delete thing
            </a>
          </span>
        </li>
    )
  }
});

module.exports = ThingList;
