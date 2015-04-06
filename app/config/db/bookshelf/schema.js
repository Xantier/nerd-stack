'use strict';

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
