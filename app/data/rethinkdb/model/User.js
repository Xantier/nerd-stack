'use strict';

export default class User {
  static register(thinky) {
    let Users = thinky.createModel('user', {
      id: thinky.type.string(),
      name: thinky.type.string().min(1),
      password: thinky.type.string().min(1)
    });
    Users.ensureIndex('name');
    thinky.models.thing.belongsTo(Users, 'user', 'user_id', 'id');
  }
}
