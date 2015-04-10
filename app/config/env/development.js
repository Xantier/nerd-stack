'use strict';

export default {
  db: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'salasana',
      database: 'nerd',
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + './../db/bookshelf/migrations',
      tableName: 'schema_version'
    }
  }
};
