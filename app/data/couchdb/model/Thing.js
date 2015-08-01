export default class User {
  static register(db) {
    db.save('_design/thing', {
      views: {
        byUserId: {
          /*eslint-disable */
          map: 'function (doc) {if (doc.document_type = "thing" && doc.user_id) { emit(doc.user_id, doc);}}' // eslint-disable-line
          /*eslint-enable */
        }
      }
    });
  }
}
