'use strict';

const React = require('react');
const Router = require('react-router');
const ThingContainer = require('../thing/ThingContainer.jsx');
const helloStore = require('./helloStore');
const helloAction = require('./helloAction');
const HelloConstants = require('./helloConstants').HelloConstants;
const { Route, Link, RouteHandler } = Router;

function getHelloString() {
  return {
    helloString: helloStore.getData().text
  };
}

const Hello = React.createClass({
  statics: {
    children: [ThingContainer],
    load: function (token, req) {
      return helloAction.getData(token, this.displayName, req);
    }
  },
  getInitialState: function () {
    return getHelloString();
  },
  componentDidMount: function () {
    helloStore.addChangeListener(HelloConstants.GET, this._onChange);
    this._maybeGetData();
  },
  componentWillUnmount: function () {
    helloStore.removeChangeListener(HelloConstants.GET, this._onChange);
  },
  _onChange: function () {
    this.setState(getHelloString());
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
          <h2>Hello, {this.state.helloString}</h2>
          <ThingContainer />
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

module.exports = Hello;
