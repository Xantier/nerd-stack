'use strict';

import React from 'react';
import ThingContainer from '../thing/ThingContainer.jsx';
import HelloStore from './HelloStore';
import HelloActions from './HelloActions';
import {HelloConstants} from './HelloConstants';
import { Route, Link, RouteHandler } from 'react-router';

function getHelloString() {
  return {
    user: HelloStore.getData().text
  };
}

export default React.createClass({
  displayName: 'Hello',
  statics: {
    children: [ThingContainer],
    load: function (token, req) {
      return HelloActions.getData(token, this.displayName, req);
    }
  },
  getInitialState: function () {
    return getHelloString();
  },
  componentDidMount: function () {
    HelloStore.addChangeListener(HelloConstants.GET, this._onChange);
    this._maybeGetData();
  },
  componentWillUnmount: function () {
    HelloStore.removeChangeListener(HelloConstants.GET, this._onChange);
  },
  _onChange: function () {
    this.setState(getHelloString());
  },
  _maybeGetData: function () {
    if (HelloStore.getData().metadata.firstRun) {
      HelloActions.getData();
    }
  },
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function () {
    return (
        <div className="hello">
          <h2>Hello {this.state.user}, here are all your things.</h2>
          <ThingContainer />
          <RouteHandler/>
        </div>
    );
  }
});
