var React = require('react');
var Router = require('react-router');
var { RouteHandler } = Router;

var App = React.createClass({

   statics: {
      fetchData: function(token, params, query) {
         return {name: "datataaa"}
      }
   },
    render: function() {
        return (
            <div className="container">
                <h1>Welcome</h1>
                <RouteHandler />
            </div>
        );
    }
});

module.exports = App;
