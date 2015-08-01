export default class Thing {
  static register(bookshelf) {
    bookshelf.models.Thing = bookshelf.Model.extend({
      tableName: 'Thing',
      user: function () {
        return this.belongsTo(bookshelf.models.User);
      }
    });
    bookshelf.models.Things = bookshelf.Collection.extend({
      model: bookshelf.models.Thing
    });
  }
}
