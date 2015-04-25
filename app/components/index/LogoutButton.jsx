'use strict';

import React from 'react';
import color from 'color';
import { StyleResolverMixin, BrowserStateMixin } from 'radium';

export default React.createClass({
  displayName: 'LogoutButton',
  mixins: [StyleResolverMixin, BrowserStateMixin],
  render() {
    const styles = {
      padding: '1.5em 2em',
      border: 0,
      borderRadius: 4,
      color: '#fff',
      cursor: 'pointer',
      fontSize: 16,
      fontWeight: 700,

      states: [
        {
          hover: {
            background: color('#0074d9').lighten(0.2).hexString()
          }
        },
        {
          focus: {
            boxShadow: '0 0 0 3px #eee, 0 0 0 6px #0074D9',
            outline: 'none'
          }
        }
      ],

      modifiers: [
        {
          kind: {
            primary: {background: '#0074D9'},
            warning: {background: '#FF4136'}
          }
        }
      ]
    };

    return (
        <a a href="/logout">
          <button {...this.getBrowserStateEvents()} style={this.buildStyles(styles)}>
            Logout
          </button>
        </a>
    );
  }
});
