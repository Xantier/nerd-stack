'use strict';

import React from 'react';
import { Link } from 'react-router';

module.exports = React.createClass({
  displayName: 'NotFound',
  render: function () {
    return (
        <div className="hello">
          <h2>Path not found :(</h2>
          <ul>
            <li>
              <Link to="home">Go Home</Link>
            </li>
          </ul>
        </div>
    );
  }
});
