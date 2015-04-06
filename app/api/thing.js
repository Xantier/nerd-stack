'use strict';

module.exports.get = function (req, res, next) {
  const Thing = new req.db.models.Thing();
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
  const Thing = req.db.models.Thing;
  Thing.forge({
    name: req.body.name,
    user_id: req.user.id
  }).save()
      .then(function (thing) {
        const data = {error: false, data: thing};
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
  const Thing = req.db.models.Thing;
  Thing.forge({id: req.params.id})
      .fetch({require: true})
      .then(function (thing) {
        thing.destroy().then(function () {
          const data = {error: false, data: {message: 'Thing deleted', id: req.params.id}};
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
  const Thing = req.db.models.Thing;
  Thing.forge({id: req.params.id})
      .fetch({require: true})
      .then(function (thing) {
        thing.set({name: req.body.name}).save()
            .then(function (savedThing) {
              const data = {error: false, data: savedThing};
              if (req.is('application/json')) {
                res.json(data);
              } else {
                res.redirect(req.get('Referrer'));
              }
            })
            .otherwise(function (err) {
              res.status(500).json({error: true, data: {message: err.message}});
            });
      });
};
