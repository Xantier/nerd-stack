export default class User {
  static register(mongoose) {
    let UserSchema = new mongoose.Schema({
      name: {type: String, default: ''},
      password: {type: String, default: ''},
      things: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thing'
      }]
    });
    UserSchema.virtual('id').get(function () {
      return this._id;
    });
    mongoose.model('User', UserSchema);
  }
}
