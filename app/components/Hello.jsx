'use strict';

var React = require('react');
var Router = require('react-router');
var { Link } = Router;

module.exports = React.createClass({

   statics: {
      fetchData: function(token, params, query) {
         return {name: "datataaa"}
      }
   },
    mixins: [ Router.State ],
    render: function() {
        var name = this.getParams().name;
        return (
            <div className="hello">
                <h2>Hello {name}</h2>
                <ul>
                    <li><Link to="home">Go Home</Link></li>
                </ul>
            </div>
        );
    }
});