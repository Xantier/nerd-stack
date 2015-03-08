var React = require('react');

var Application = React.createClass({

   propTypes: {
      path: React.PropTypes.string.isRequired,
      onSetTitle: React.PropTypes.func.isRequired
   },

   render: function() {
      var page = {
         title: 'Hello',
         content: 'Hello World'
      };
      this.props.onSetTitle(page.title);

      return (
            <div className="container">
               <h1>{page.title}</h1>
               <div>{page.content}</div>
            </div>
      );
   }
});

module.exports = Application;