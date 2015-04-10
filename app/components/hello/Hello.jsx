'use strict';

import React from 'react';
import ThingContainer from '../thing/ThingContainer.jsx';
import HelloStore from './HelloStore';
import HelloActions from './HelloActions';
import ContextMixin from '../../util/ContextMixin';
import {HelloConstants} from './HelloConstants';
import { Route, Link, RouteHandler } from 'react-router';

function getHelloString() {
  return HelloStore.getData().data;
}

export default React.createClass({
  displayName: 'Hello',
  statics: {
    children: [ThingContainer],
    load: function (context) {
      return HelloActions.getData(context);
    }
  },
  mixins: [ContextMixin],
  getInitialState(){
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
