export default {
  getInitialState: function () {
    if (this.props.context) {
      var context = this.props.context.data[this.constructor.displayName];
      console.log(context);
      return {user: context};
    }
  }
};
