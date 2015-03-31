'use strict';

var knex = require('knex')(require('../../env/development').db);
var bookshelf = require('bookshelf')(knex);
bookshelf.models = {};

// Register models
require('./model/User').register(bookshelf);
require('./model/Thing').register(bookshelf);

// TODO: Migrations functions to automatically update DB
// var db = require('./db/schema').tables;

module.exports = bookshelf;
