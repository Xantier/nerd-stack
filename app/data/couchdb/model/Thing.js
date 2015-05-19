'use strict';

import couchDBModel from 'couchdb-model';

export default class User {
  static register(db) {
    db.insert({
      views: {
        by_name: {
          map: function (doc) {
            emit(doc.name, doc);
          }
        }
      }
    }, '_design/thing');

    db.models.thing = couchDBModel(db, {
      views: [
        '_design/thing/_view/by_name',
        {
          path: '_design/thing/_view/by_name'
        }
      ]
    });
  }
}
