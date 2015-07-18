'use strict';

import React from 'react';
import ThingContainer from '../thing/ThingContainer.jsx';
import UserStore from '../user/UserStore';
import UserActions from '../user/UserActions';
import ContextMixin from '../decorators/ContextMixin';
import {UserConstants} from '../user/UserConstants';
import { Route, Link, RouteHandler } from 'react-router';

function getHelloString() {
  return UserStore.getData().data;
}

export default React.createClass({
  displayName: 'Hello',
  statics: {
    children: [ThingContainer],
    load: function (context) {
      return UserActions.getData(context);
    }
  },
  mixins: [ContextMixin],
  getInitialState(){
    return getHelloString();
  },
  componentDidMount: function () {
    UserStore.addChangeListener(UserConstants.GET, this._onChange);
    this._maybeGetData();
  },
  componentWillUnmount: function () {
    UserStore.removeChangeListener(UserConstants.GET, this._onChange);
  },
  _onChange: function () {
    this.setState(getHelloString());
  },
  _maybeGetData: function () {
    if (UserStore.getData().metadata.firstRun) {
      UserActions.getData();
    }
  },
  render: function () {
    return (
        <div className="mdl-typography--text-center">
          <h2>Hello {this.state.user}, here are all your things.</h2>
          <ThingContainer />
          <RouteHandler/>
        </div>
    );
  }
});
