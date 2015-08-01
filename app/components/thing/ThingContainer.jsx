import React from 'react';
import Thing from './Thing.jsx';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import Label from '../common/Label.jsx';
import ThingStore from './ThingStore';
import ThingActions from './ThingActions';
import {ThingConstants} from './ThingConstants';
import ContextMixin from '../decorators/ContextMixin';
import MaterialRebindMixin from '../decorators/MaterialRebindMixin.js';

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
  mixins: [ContextMixin, MaterialRebindMixin],
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
          <div className="mdl-card mdl-shadow--4dp form-card-medium">
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">Create Thing</h2>
            </div>
            <form action="/API/thing" method="post" onSubmit={this._createThing}>
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label textfield-demo">
                <Label htmlFor="name" text="Create new item" />
                <Input id="name" name="name" type="text" onChange={this._setChangedText} />
              </div>
              <div className="form-footer">
                <div style={{float: 'left'}}>
                  <Button type="submit" text="Create" />
                </div>
                <div style={{float: 'right'}}>
                  <Button type="reset" text="Clear" />
                </div>
              </div>
            </form>
          </div>
          <div className="mdl-card mdl-shadow--4dp form-card-large" style={{marginTop: '15px'}}>
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">Current Things</h2>
            </div>
            <table className="mdl-data-table mdl-js-data-table">
              <thead>
                <tr>
                  <th className="mdl-data-table__cell--non-numeric">Name</th>
                  <th className="mdl-data-table__cell--non-numeric table-button">Delete</th>
                </tr>
              </thead>
              <tbody>
              {thingList}
              </tbody>
            </table>
          </div>
        </div>
    );
  }
});
