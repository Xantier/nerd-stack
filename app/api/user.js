'use strict';

module.exports.index = function (req, res) {
  var User = req.db.models.User;
  new User().fetch().then(function (collection) {
    res.send(collection.get('name'));
  });
};

module.exports.create = function (req, res) {
  res.send('User creation not implemented yet.');
};
