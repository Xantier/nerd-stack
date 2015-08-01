export default class User {
  static register(bookshelf) {
    bookshelf.models.User = bookshelf.Model.extend({
      tableName: 'User',
      idAttribute: 'id'
    });
    bookshelf.models.Users = bookshelf.Collection.extend({
      model: bookshelf.models.User
    });
  }
}
