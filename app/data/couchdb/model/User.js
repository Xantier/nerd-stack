'use strict';

import couchDBModel from 'couchdb-model';

export default
class User {
  static register(db) {
    db.save('_design/user', {
      views: {
        byName: {
          map: 'function (doc) {if (doc.name) { emit(doc.name, doc);}}'
        }
      }
    });
  }
}
