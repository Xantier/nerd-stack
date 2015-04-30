'use strict';

import React from 'react';
import { StyleResolverMixin } from 'radium';
import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';
import ThingActions from './ThingActions';

export default React.createClass({
  displayName: 'Thing',
  propTypes: {
    _modify: React.PropTypes.func.isRequired,
    item: React.PropTypes.object.isRequired
  },
  mixins: [StyleResolverMixin],
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
          <form action="/API/thing?_method=PUT" method="post" onSubmit={this._modify}>
            <Input name="name" type="text" onChange={this._setChangedText} />
            <Button text="Update" />
          </form>
      );
    }
    return (
        <li ref="itemContainer">
          <span ref="thingSpan" onContextMenu={this._enableEditMode}>{this.props.item.name}
            <a onClick={this._delete} href={'/API/thing/' + this.props.item.id + '?_method=DELETE'}>
              <Button text="Delete" />
            </a>
          </span>
        </li>
    );
  }
});
