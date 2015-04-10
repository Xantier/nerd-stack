'use strict';

export default class User {
  static register(mongoose) {
    let ThingSchema = new mongoose.Schema({
      name: {type: String, default: ''}
    });
    mongoose.model('Thing', ThingSchema);
  }
}
