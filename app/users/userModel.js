var bookshelf = require('../../config/bookshelf');
var User = bookshelf.Model.extend({
   tableName: 'users'
});

module.exports = User;