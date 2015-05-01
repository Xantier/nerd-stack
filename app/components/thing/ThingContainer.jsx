'use strict';

import React from 'react';
import Thing from './Thing.jsx';
import Input from '../common/Input.jsx';
import Submit from '../common/Submit.jsx';
import ThingStore from './ThingStore';
import ThingActions from './ThingActions';
import {ThingConstants} from './ThingConstants';
import ContextMixin from '../../util/ContextMixin';

const formStyles = {
  float: 'left',
  maxWidth: '300px',
  margin: '30px auto',
  padding: '10px 20px',
  background: '#d8d8d8',
  borderRadius: '8px'
};

const thingListStyles = {
  float: 'left',
  maxWidth: '300px',
  margin: '30px 20px',
  padding: '10px 20px',
  background: '#d8d8d8',
  borderRadius: '8px'
};

function getThings() {
  return ThingStore.getData().data;
}

export default React.createClass({
  displayName: 'ThingContainer',
  statics: {
    load: function (context) {
      return ThingActions.getData(context);
    }
  },
  mixins: [ContextMixin],
  getInitialState() {
    return getThings();
  },
  componentDidMount() {
    Object.keys(ThingConstants).forEach(function (key) {
      ThingStore.addChangeListener(key, this._onChange);
    }.bind(this));
    this._maybeGetData();
  },
  componentWillUnmount() {
    Object.keys(ThingConstants).forEach(function (key) {
      ThingStore.removeChangeListener(key, this._onChange);
    }.bind(this));
  },
  _createThing(e) {
    e.preventDefault();
    ThingActions.create({name: this.state.name});
  },
  _onChange() {
    this.setState(getThings());
  },
  _setChangedText(event) {
    this.setState({name: event.target.value});
  },
  _maybeGetData() {
    if (ThingStore.getData().metadata.firstRun) {
      ThingActions.getData();
    }
  },
  _modify(id, payload) {
    ThingActions.update(id, payload);
  },
  render() {
    let thingList;
    if (this.state.things && this.state.things.length) {
      thingList = this.state.things.map(function (thing) {
        return <Thing item={thing} key={thing.id} _modify={this._modify} editState={false} />;
      }.bind(this));
    }

    return (
        <div>
          <form action="/API/thing" method="post" onSubmit={this._createThing}>
            <Input name="name" type="text" onChange={this._setChangedText} />
            <Submit name="Create Thing" />
          </form>
          <div>
            Current Things
            <ul>
            {thingList}
            </ul>
          </div>
        </div>
    );
  }
});
