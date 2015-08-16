import Knex from 'knex';
import config from '../../config/config.json';
const knex = Knex(config.bookshelf.postgresql);

export default function () {
  knex.migrate.latest(config.bookshelf.migrations)
      .then(function () {
        knex.destroy();
      });
}
