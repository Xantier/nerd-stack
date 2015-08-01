import seraph from 'seraph';
//import config from '../../config/config.json';

let db = seraph();

db.models = {};
// Register models

import Thing from './model/Thing';
Thing.register(db);
import User from './model/User';
User.register(db);

export default db;
