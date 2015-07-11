'use strict';

import React from 'react';
import UserStore from './UserStore';
import UserActions from './UserActions';
import ContextMixin from '../common/Mixins/ContextMixin';
import {UserConstants} from './UserConstants';
import { Route, Link, RouteHandler } from 'react-router';

function getHelloString() {
  return UserStore.getData().data;
}

export default React.createClass({
  displayName: 'Profile',
  statics: {
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
        <div>
          <h2>{this.state.user}</h2>
        </div>
    );
  }
});
