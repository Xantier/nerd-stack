import React from 'react';

export default {
  contextTypes: {
    data: React.PropTypes.object
  },
  componentWillMount(){
    if (this.context && this.context.data) {
      this.setState(this.context.data[this.constructor.displayName]);
    }
  }
};
