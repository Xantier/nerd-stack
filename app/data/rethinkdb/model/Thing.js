export default class Thing {
  static register(thinky) {
    let Things = thinky.createModel('thing', {
      id: thinky.type.string(),
      name: thinky.type.string().min(1),
      user_id: thinky.type.string().min(1)
    });
    Things.ensureIndex('name');
  }
}
