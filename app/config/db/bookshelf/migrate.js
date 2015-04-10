'use strict';

import Knex from 'knex';
import config from '../config.json';
const knex = Knex.initialize(config.bookshelf.postgresql);

export default function () {
  knex.migrate.latest(config.bookshelf.migrations)
      .then(function () {
        knex.destroy();
      });
}
