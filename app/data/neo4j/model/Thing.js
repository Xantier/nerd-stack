'use strict';

import model from 'seraph-model';

export default class Thing {
  static register(db) {
    let Thing = model(db, 'thing');
    Thing.fields = ['name'];
    db.models.Things = Thing;
    console.log(db);
  }
}
