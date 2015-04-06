'use strict';

import knex from 'knex';
import config from '../../env/development';
import Bookshelf from 'bookshelf'
const knexConfig = knex(config.db);
let bookshelf = new Bookshelf(knexConfig);

bookshelf.models = {};

// Register models
import User from './model/User';
User.register(bookshelf);
import Thing from './model/Thing'
Thing.register(bookshelf);

// TODO: Migrations functions to automatically update DB
// var db = import from'./db/schema').tables;

module.exports = bookshelf;
