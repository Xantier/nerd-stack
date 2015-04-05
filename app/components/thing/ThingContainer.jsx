'use strict';

var React = require('react');
var ThingList = require('./ThingList.jsx');
var thingStore = require('./thingStore');
var thingAction = require('./thingAction');
var ThingConstants = require('./thingConstants').ThingConstants;

function getThings() {
  return {
    things: thingStore.getData().data
  };
}

var ThingContainer = React.createClass({
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
            <button>Create Thing</button>
          </form>
          <br/>
          Current Things
          <ThingList things={this.state.things} />
        </div>
    )
  }
});

module.exports = ThingContainer;
