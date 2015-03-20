'use strict';

var React = require('react');
var Router = require('react-router');
var helloStore = require('./helloStore');
var helloAction = require('./helloAction');
var { Link } = Router;

function getHelloString() {
   return {
      helloString: helloStore.get()
   };
}

module.exports = React.createClass({

   getInitialState: function () {
      return getHelloString();
   },

   componentDidMount: function () {
      helloStore.addChangeListener(this._onChange);
   },

   componentWillUnmount: function () {
      helloStore.removeChangeListener(this._onChange);
   },

   _onChange: function() {
      this.setState(getHelloString());
   },
   _onDoubleClick: function() {
      helloAction.create('Tsi tsing');
   },
   statics: {
      fetchData: function (token, params, query) {
         return {name: "datataaa"}
      }
   },
   mixins: [Router.State],
   render: function () {
      var name = this.getParams().name;
      return (
            <div className="hello">
               <h2>Hello {name}</h2>
               <h2  onDoubleClick={this._onDoubleClick}>Hello, {this.state.helloString}</h2>
               <ul>
                  <li>
                     <Link to="home">Go Home</Link>
                  </li>
               </ul>
            </div>
      );
   }
});