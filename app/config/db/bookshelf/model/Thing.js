'use strict';

module.exports.register = function (bookshelf) {
  bookshelf.models.Thing = bookshelf.Model.extend({
    tableName: 'things',
    user: function () {
      return this.belongsTo(bookshelf.models.User);
    }
  });
};
