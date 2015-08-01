export default class User {
  static register(thinky) {
    let Users = thinky.createModel('user', {
      id: thinky.type.string(),
      name: thinky.type.string().min(1),
      password: thinky.type.string().min(1)
    });
    Users.ensureIndex('name');
    Users.hasMany(thinky.models.thing, 'things', 'id', 'user_id');
  }
}
