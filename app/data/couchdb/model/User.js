export default
class User {
  static register(db) {
    db.save('_design/user', {
      views: {
        byName: {
          map: 'function (doc) {if (doc.document_type = "user") { emit(doc.name, doc);}}'
        }
      }
    });
  }
}
