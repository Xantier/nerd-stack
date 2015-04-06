'use strict';

// Still ES5
/*eslint-disable */

var Knex = require('knex');
var config = require('../../env/development');
var knex = Knex.initialize(config.db);

module.exports.migrate = function () {
  knex.migrate.latest(config.db.migrations)
      .then(function () {
    knex.destroy();
  });
};
/*eslint-enable */
