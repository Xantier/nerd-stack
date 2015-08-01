import cradle from 'cradle';
import config from '../../config/config.json';

const db = new cradle.Connection(config.couchdb.host, config.couchdb.port)
    .database(config.couchdb.db);

db.models = {};
// Register models
import User from './model/User';
User.register(db);

import Thing from './model/Thing';
Thing.register(db);

export default db;
