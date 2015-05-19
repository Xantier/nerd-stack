'use strict';

import nano from 'nano';
import config from '../../config/config.json';

const connection = nano(config.couchdb.host);
const db = connection.use(config.couchdb.db);

db.models = {};
// Register models
import User from './model/User';
User.register(db);

import Thing from './model/Thing';
Thing.register(db);

export default db;
