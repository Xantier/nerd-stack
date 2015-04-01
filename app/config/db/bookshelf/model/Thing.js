'use strict';

module.exports.register = function (bookshelf) {
  bookshelf.models.Thing = bookshelf.Model.extend({
    tableName: 'Thing',
    user: function () {
      return this.belongsTo(bookshelf.models.User);
    }
  });
};
