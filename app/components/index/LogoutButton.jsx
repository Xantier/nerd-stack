'use strict';

import React from 'react';

export default React.createClass({
  displayName: 'LogoutButton',
  render: function () {
    return (
        <ul>
          <li>
            <a href="/logout">logout</a>
          </li>
        </ul>
    );
  }
});
