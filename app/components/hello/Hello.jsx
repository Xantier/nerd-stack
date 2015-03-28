'use strict';

var React = require('react');
var Router = require('react-router');
var helloStore = require('./helloStore');
var helloAction = require('./helloAction');
var { Link } = Router;

function getHelloString() {
  return {
    helloString: helloStore.getData().text
  };
}

module.exports = React.createClass({

  statics: {
    fetchData: function () {
      helloAction.getData();
    }
  },
  getInitialState: function () {
    return getHelloString();
  },
  componentDidMount: function () {
    helloStore.addChangeListener('get', this._onChange);
    this.maybeGetData();
  },
  componentWillUnmount: function () {
    helloStore.removeChangeListener('get', this._onChange);
  },
  _onChange: function () {
    this.setState(getHelloString());
  },
  _onDoubleClick: function () {
    helloAction.create('Tsi tsing');
  },
  maybeGetData: function () {
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
          <ul>
            <li>
              <Link to="home">Go Home</Link>
            </li>
          </ul>
        </div>
    );
  }
});