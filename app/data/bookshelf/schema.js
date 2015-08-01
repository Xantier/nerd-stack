// At the moment this is not used since we do migrations with Knex built in migrations.
// We should write a module to handle migrations from individual schema files
// See flywaydb.org for Java side of things

export default {
  Users: {
    id: {type: 'increments', nullable: false, primary: true},
    name: {type: 'string', maxlength: 150, nullable: false}
  },
  Things: {
    id: {type: 'increments', nullable: false, primary: true},
    name: {type: 'string', maxlength: 150, nullable: false},
    userId: {type: 'foreignKey', references: 'Users.id'}
  }
};
