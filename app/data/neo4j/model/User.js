'use strict';

import model from 'seraph-model';

export default class User {
  static register(db) {
    let user = model(db, 'user');
    user.fields = ['name', 'password', 'things'];
    user.compose(db.models.Things, 'things', 'owns_things');
    db.models.Users = user;
  }
}
