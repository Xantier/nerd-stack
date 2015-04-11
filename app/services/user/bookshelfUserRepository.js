'use strict';

export function getUser(db, id, cb) {
  const User = new db.models.User(
      {id: id}
  );
  return User.fetch().then(function (user) {
    return cb(null, user.get('name'));
  }).otherwise(function (err) {
    return cb(err, null);
  });
}

export function addUser(db, payload, cb) {
  const User = db.models.User;
  User.forge({
    name: payload.name
  }).save()
      .then(function (user) {
        cb(null, user.get('id'));
      })
      .otherwise(function (err) {
        cb(err, null);
      });
}
