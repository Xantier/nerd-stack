//Imports
var users = require('../app/users/userController');
var React = require('react');
var Application = React.createFactory(require('./Application'));
var _ = require('lodash');
var fs = require('fs');

var template = fs.readFileSync('index.html', 'utf8');

module.exports = function(app){

   // Server-side rendering (SSR)
   app.get('/', function(req, res) {
      var data = {};
      var component = Application({
         path: req.path,
         onSetTitle: (title) => data.title = title,
         onPageNotFound: () => res.status(404)
      });
      data.body = React.renderToString(component);
      var html = _.template(template);
      res.send(html(data));
   });
};