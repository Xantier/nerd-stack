'use strict';

import config from './config.json';

export default function (passport) {
  const db = require(__dirname + config[config.db].init);
  const passportConfig = require(__dirname + config[config.db].passport);
  passportConfig(passport, db);
  return db;
}
