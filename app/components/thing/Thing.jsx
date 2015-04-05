'use strict';

var React = require('react');
var ThingList = require('./ThingList.jsx');
var thingStore = require('./thingStore');
var thingAction = require('./thingAction');
var actions = require('./thingConstants').ActionTypes;

function getThings() {
  return {
    things: thingStore.getData().data
  };
}

var Thing = React.createClass({
  statics: {
    fetchData: function (token, req) {
      return thingAction.getData(token, this.displayName, req);
    }
  },
  getInitialState: function () {
    return getThings();
  },
  componentDidMount: function () {
    thingStore.addChangeListener(actions.GET_THINGS, this._onChange);
    thingStore.addChangeListener(actions.CREATE_THING, this._onChange);
    thingStore.addChangeListener(actions.DELETE_THING, this._onChange);
    thingStore.addChangeListener(actions.UPDATE_THING, this._onChange);
    this._maybeGetData();
  },
  componentWillUnmount: function () {
    thingStore.removeChangeListener(actions.GET_THINGS, this._onChange);
    thingStore.removeChangeListener(actions.CREATE_THING, this._onChange);
    thingStore.removeChangeListener(actions.DELETE_THING, this._onChange);
    thingStore.removeChangeListener(actions.UPDATE_THING, this._onChange);
  },
  _handleChange: function (e) {
    e.preventDefault();
    thingAction.create({name: this.state.name});
  },
  _onChange: function () {
    this.setState(getThings());
  },
  _setChangedText: function (event) {
    this.setState({name: event.target.value});
  },
  _maybeGetData: function () {
    if (thingStore.getData().metadata.firstRun) {
      thingAction.getData();
    }
  },
  render: function () {
    return (
        <div>
          <form action="/API/thing" method="post" onSubmit={this._handleChange}>
            <input name="name" type="text" onChange={this._setChangedText} />
            <button >Create Thing</button>
          </form>
          <br/>
          Current Things
          <ThingList things={this.state.things} />
        </div>
    )
  }
});

module.exports = Thing;
