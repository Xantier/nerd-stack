import config from './config.json';

export default function (passport) {
  const db = require('../' + config[config.db].init);
  const passportConfig = require('../' + config[config.db].passport);
  passportConfig(passport, db);
  return db;
}
