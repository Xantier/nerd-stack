'use strict';

// TODO: create adapter to handle simplest CRUD operations on each database
//var db = require('../config/db/adapter');

module.exports.get = function (req, res) {
  var User = req.db.models.User;
  new User().fetch().then(function (collection) {
    if (collection) {
      res.send(collection.get('name'));
    } else {
      res.send('Nothing found');
    }
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
