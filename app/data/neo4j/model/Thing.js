import model from 'seraph-model';

export default class Thing {
  static register(db) {
    let thing = model(db, 'THING');
    thing.schema = {
      name: { type: String, required: true }
    };
    db.models.thing = thing;
  }
}
