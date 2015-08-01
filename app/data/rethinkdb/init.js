import Thinky from 'thinky';
import config from '../../config/config.json';

let thinky = Thinky(config.rethinkdb);

// Register models
import Thing from './model/Thing';
Thing.register(thinky);
import User from './model/User';
User.register(thinky);
export default thinky;
