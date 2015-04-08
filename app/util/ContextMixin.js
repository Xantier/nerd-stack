'use strict';

import React from 'react';

export default {
  contextTypes: {
    data: React.PropTypes.object
  },
  getInitialState: function () {
    if (this.context && this.context.data) {
      console.log(this.context);
      var data = this.context.data[this.constructor.displayName];
      console.log(data);
      return data;
    }
    return {};
  }
};
