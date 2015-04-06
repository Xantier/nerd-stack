'use strict';

const Knex = require('knex');
const config = require('../../env/development');
let knex = Knex.initialize(config.db);

module.exports.migrate = function () {
  knex.migrate.latest(config.db.migrations)
      .then(function () {
    knex.destroy();
  });
};
