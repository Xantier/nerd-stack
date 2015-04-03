'use strict';

var React = require('react');
var Router = require('react-router');
var Thing = require('../thing/Thing.jsx');
var helloStore = require('./helloStore');
var helloAction = require('./helloAction');
var { Route, Link, RouteHandler } = Router;



function getHelloString() {
  return {
    helloString: helloStore.getData().text
  };
}

var Hello = module.exports = React.createClass({
  statics: {
    children : [Thing],
    fetchData: function () {
      helloAction.getData();
      this.children.forEach(function(child){
        child.fetchData();
      })
    }
  },
  // Possibly server rendered data
  getInitialState: function () {
    return getHelloString();
  },
  componentDidMount: function () {
    helloStore.addChangeListener('get', this._onChange);
    this._maybeGetData();
  },
  componentWillUnmount: function () {
    helloStore.removeChangeListener('get', this._onChange);
  },
  _onChange: function () {
    this.setState(getHelloString());
  },
  _onDoubleClick: function () {
    helloAction.create({name: 'Tsi tsing'});
  },
  _maybeGetData: function () {
    if (helloStore.getData().metadata.firstRun) {
      helloAction.getData();
    }
  },
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function () {
    var name = this.context.router.getCurrentParams().name;
    return (
        <div className="hello">
          <h2>Hello {name}</h2>
          <h2  onDoubleClick={this._onDoubleClick}>Hello, {this.state.helloString}</h2>
          <Thing ref="thing" data={this.state.things} />
          <ul>
            <li>
              <Link to="home">Go Home</Link>
            </li>
          </ul>
          <RouteHandler/>
        </div>
    );
  }
});