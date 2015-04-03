'use strict';

var React = require('react');
var ThingList = require('./ThingList.jsx');
var thingStore = require('./thingStore');
var thingAction = require('./thingAction');

function getThings() {
  return {
    things: thingStore.getData().data
  };
}

module.exports = React.createClass({
  statics: {
    fetchData: function () {
      thingAction.getData();
    }
  },
  // Possibly server rendered data
  // TODO: Refactor srd to be props instead?
  getInitialState: function () {
    return getThings();
  },
  componentDidMount: function () {
    thingStore.addChangeListener('getThings', this._onChange);
    thingStore.addChangeListener('createThing', this._onChange);
    this._maybeGetData();
  },
  componentWillUnmount: function () {
    thingStore.removeChangeListener('getThings', this._onChange);
    thingStore.addChangeListener('createThing', this._onChange);
  },
  _handleChange: function () {
    thingAction.create({name: this.state.name});
  },
  _onChange: function () {
    this.setState(getThings());
  },
  _setChangedText: function(event){
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
          <input type="text" onChange={this._setChangedText} />
          <button name="createThing" onClick={this._handleChange}>Create Thing</button>
          <br/>Current Things
          <ThingList things={this.state.things} />
        </div>
    )
  }
});