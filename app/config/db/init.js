'use strict';

import config from './config.json';

export default function (passport) {
  const db = require(__dirname + config.bookshelf.init);
  const passportConfig = require(__dirname + config.bookshelf.passport);
  passportConfig(passport, db);
  return db;
}
