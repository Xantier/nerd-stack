import knex from 'knex';
import config from '../../config/config.json';
import Bookshelf from 'bookshelf';

const dbConf = config.bookshelf[config.bookshelf.db];
const knexConfig = knex(dbConf);
let bookshelf = new Bookshelf(knexConfig);

bookshelf.models = {};

// Register models
import User from './model/User';
User.register(bookshelf);
import Thing from './model/Thing';
Thing.register(bookshelf);

// TODO: Migrations functions to automatically update DB
// var db = import from'./db/schema').tables;

export default bookshelf;
