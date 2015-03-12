var knex = require('knex')(require('./env/development').db);
var bookshelf = require('bookshelf')(knex);

// TODO: Migrations functions to automatically update DB
var db = require('./db/schema').tables;


module.exports = bookshelf;