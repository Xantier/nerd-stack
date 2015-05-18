'use strict';

import nano from 'nano';
import couchDBModel from 'couchdb-model';
import config from '../../config/config.json';

const connection = nano(config.couchdb.host);
const db = connection.use(config.couchdb.db);

db.models = {};
db.models.user = couchDBModel(db);
db.models.thing = couchDBModel(db);
export default db;
