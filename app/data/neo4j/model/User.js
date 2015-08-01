import model from 'seraph-model';

export default class User {
  static register(db) {
    let UserSchema = model(db, 'USER');
    UserSchema.schema = {
      name: {type: String, required: true},
      password: {type: String, required: true},
      things: {type: Array}
    };
    UserSchema.compose(db.models.thing, 'things', 'owns_things');
    db.models.user = UserSchema;
  }
}
