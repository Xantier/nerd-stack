'use strict';

module.exports.get = function (req, res, next) {
  var Thing = new req.db.models.Thing();
  return Thing.fetchAll({user_id: req.user.id})
      .then(function (collection) {
        res.payload = collection.toJSON();
        return next();
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
};

module.exports.create = function (req, res) {
  var Thing = req.db.models.Thing;
  Thing.forge({
    name: req.body.name,
    user_id: req.user.id
  }).save()
      .then(function (thing) {
        var data = {error: false, data: thing};
        if (req.is('application/json')) {
          res.json(data);
        } else {
          res.redirect(req.get('Referrer'));
        }
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
};

module.exports.del = function (req, res) {
  var Thing = req.db.models.Thing;
  Thing.forge({id: req.params.id})
      .fetch({require: true})
      .then(function (thing) {
        thing.destroy().then(function () {
          var data = {error: false, data: {message: 'Thing deleted', id: req.params.id}};
          if (req.get('content-type') === 'application/json') {
            res.json(data);
          } else {
            res.redirect(req.get('Referrer'));
          }
        });
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
};

module.exports.update = function (req, res) {
  var Thing = req.db.models.Thing;
  new Thing().fetchOne({id: req.params.id})
      .then(function (collection) {
        res.send(collection.toJSON());
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
};
