'use strict';

module.exports.index = function (req, res) {
  var Thing = req.db.models.Thing;
  new Thing().fetch().then(function (collection) {
    res.send(collection.get('name'));
  });
};

module.exports.create = function (req, res) {
  var Thing = req.db.models.Thing;
  Thing.forge({
    name: req.body.name,
    user_id: req.body.user
  }).save()
      .then(function (thing) {
        res.json({error: false, data: {id: thing.get('id')}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
};
