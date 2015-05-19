'use strict';

import couchDBModel from 'couchdb-model';

export default
class User {
  static register(db) {
    db.insert({
      'views': {
        'by_name': {
          'map': 'function (doc) {if (doc.name) { emit(doc.name, doc);}}'
        }
      }
    }, '_design/user');

    db.models.user = couchDBModel(db, {
      views: [
        '_design/user/_view/by_name',
        {
          path: '_design/user/_view/by_name'
        }
      ]
    });
  }
}
