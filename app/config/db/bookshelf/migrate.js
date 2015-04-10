'use strict';

let Knex = require('knex');
let config = require('../../env/development');
let knex = Knex.initialize(config.db);

export default function () {
  knex.migrate.latest(config.db.migrations)
      .then(function () {
    knex.destroy();
  });
}
