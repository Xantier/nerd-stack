/**
 * Naming convention for migration files is date, hours, minutes, seconds, milliseconds
 * 4+2+2+2+2+2+3 = 17 numbers e.g. 20150331211015325
 **/

export function up(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('Thing', function (table) {
      table.bigIncrements('id').primary().unsigned();
      table.string('name', 50);
      table.biginteger('user_id').unsigned().index().references('id').inTable('User');
    }),
    knex.schema.createTable('User', function (table) {
      table.bigIncrements('id').primary().unsigned();
      table.string('name', 50);
      table.string('password', 255);
    })
  ]);
}

export function down(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('User'),
    knex.schema.dropTable('Thing')
  ]);
}
