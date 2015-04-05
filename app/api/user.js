'use strict';

// TODO: create adapter to handle simplest CRUD operations on each database
//var db = require('../config/db/adapter');

module.exports.get = function (req, res, next) {
  var User = new req.db.models.User(
      {id: req.user.id}
  );
  return User.fetch().then(function (collection) {
    if (collection) {
      res.payload = collection.get('name');
    } else {
      res.payload = 'Nothing found';
    }
    return next();
  });
};

module.exports.create = function (req, res) {
  var User = req.db.models.User;
  User.forge({
    name: req.body.name
  }).save()
      .then(function (user) {
        res.json({error: false, data: {id: user.get('id')}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
};
