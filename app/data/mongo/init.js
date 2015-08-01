import mongoose from 'mongoose';
import config from '../../config/config.json';

const mongopt = config.mongo.config.development;
const options = {
  db: {native_parser: true},
  server: {poolSize: 5},
  user: mongopt.user,
  pass: mongopt.pass
};

mongoose.connect(mongopt.db, options);
mongoose.models = {};

// Register models
import User from './model/User';
User.register(mongoose);
import Thing from './model/Thing';
Thing.register(mongoose);

export default mongoose;
