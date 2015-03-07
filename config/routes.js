//Imports
var index = require('../app/index/indexController');
var users = require('../app/users/userController');

module.exports = function(app){
   app.use('/', index);
   app.use('/users', users);

};