'use strict';

export default
class Thing {
  static register(mongoose) {
    let ThingSchema = new mongoose.Schema({
      name: {type: String, default: ''}
    });
    mongoose.model('Thing', ThingSchema);
    mongoose.models.Thing = ThingSchema;
  }
}
