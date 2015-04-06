'use strict';

const React = require('react');
const ThingList = require('./ThingList.jsx');
const thingStore = require('./thingStore');
const thingAction = require('./thingAction');
const ThingConstants = require('./thingConstants').ThingConstants;

function getThings() {
  return {
    things: thingStore.getData().data
  };
}

const ThingContainer = React.createClass({
  statics: {
    load: function (token, req) {
      return thingAction.getData(token, this.displayName, req);
    }
  },
  getInitialState: function () {
    return getThings();
  },
  componentDidMount: function () {
    Object.keys(ThingConstants).forEach(function(key){
      thingStore.addChangeListener(key, this._onChange);
    }.bind(this));
    this._maybeGetData();
  },
  componentWillUnmount: function () {
    Object.keys(ThingConstants).forEach(function(key){
      thingStore.removeChangeListener(key, this._onChange);
    }.bind(this));
  },
  _createThing: function (e) {
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
  _modify: function(id, payload){
    thingAction.update(id, payload);
  },
  render: function () {
    return (
        <div>
          <form action="/API/thing" method="post" onSubmit={this._createThing}>
            <input name="name" type="text" onChange={this._setChangedText} />
            <button>Create Thing</button>
          </form>
          <br/>
          Current Things
          <ThingList things={this.state.things} _modify={this._modify} editState={false} />
        </div>
    )
  }
});

module.exports = ThingContainer;
