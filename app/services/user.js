'use strict';

// TODO: Push DB functionality to DAO layer for each DB implementation
export default {
  get(req, res, next) {
    const User = new req.db.models.User(
        {id: req.user.id}
    );
    return User.fetch().then(function (collection) {
      if (collection) {
        res.payload = {user: collection.get('name')};
      } else {
        res.payload = {user: 'Nothing found'};
      }
      return next();
    });
  },

  create(req, res) {
    const User = req.db.models.User;
    User.forge({
      name: req.body.name
    }).save()
        .then(function (user) {
          res.json({error: false, data: {id: user.get('id')}});
        })
        .otherwise(function (err) {
          res.status(500).json({error: true, data: {message: err.message}});
        });
  }
};
