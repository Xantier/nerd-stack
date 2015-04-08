'use strict';

import React from 'react';

export default {
  contextTypes: {
    data: React.PropTypes.object
  },
  getInitialState: function () {
    if (this.context && this.context.data) {
      return this.context.data[this.constructor.displayName];
    }
    return {};
  }
};
