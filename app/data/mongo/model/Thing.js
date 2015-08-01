export default class Thing {
  static register(mongoose) {
    let ThingSchema = new mongoose.Schema({
      name: {type: String, default: ''}
    });

    ThingSchema.virtual('id').get(function () {
      return this._id.toHexString();
    });

    mongoose.model('Thing', ThingSchema);

  }
}
