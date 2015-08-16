import Knex from 'knex';
import config from '../../config/config.json';

const dbConf = config.bookshelf[config.bookshelf.db];
const knex = Knex(dbConf);

export default function () {
  knex.migrate.latest(config.bookshelf.migrations)
      .then(function () {
        knex.destroy();
      });
}
