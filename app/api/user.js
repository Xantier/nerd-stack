'use strict';

//var db = require('../config/db/adapter');

module.exports.index = function (req, res) {
  var User = req.db.models.User;
  new User().fetch().then(function (collection) {
    res.send(collection.get('name'));
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
