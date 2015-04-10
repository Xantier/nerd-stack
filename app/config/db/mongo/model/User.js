'use strict';

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
    mongoose.model('User', UserSchema);
  }
}
