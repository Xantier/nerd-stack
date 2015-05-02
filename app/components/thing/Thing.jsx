'use strict';

import React from 'react';
import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';
import Label from '../common/Label.jsx';
import ThingActions from './ThingActions';

export default React.createClass({
  displayName: 'Thing',
  propTypes: {
    _modify: React.PropTypes.func.isRequired,
    item: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return {editing: false};
  },
  _delete(e) {
    e.preventDefault();
    ThingActions.del(this.props.item.id);
  },
  _enableEditMode() {
    this.setState({editing: true});
  },
  _modify(e) {
    e.preventDefault();
    this.props._modify(this.props.item.id, {name: this.state.name});
    this.setState({editing: false});
  },
  _setChangedText(event) {
    this.setState({name: event.target.value});
  },
  render() {
    if (this.state.editing) {
      return (
          <form className="thing-item" action="/API/thing?_method=PUT" method="post" onSubmit={this._modify}>
            <Input name="name" type="text" onChange={this._setChangedText} />
            <Button text="Update" />
          </form>
      );
    }
    return (
        <li>
          <div className="thing-item">
            <div className="tooltip" ref="thingSpan" onContextMenu={this._enableEditMode}>
            {this.props.item.name}
              <pre>
                <img className="callout" src="img/callout.gif" />
                Right click to edit
              </pre>
            </div>
            <a onClick={this._delete} href={'/API/thing/' + this.props.item.id + '?_method=DELETE'}>
              <Button text="Delete" />
            </a>
          </div>
        </li>
    );
  }
});
