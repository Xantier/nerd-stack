'use strict';

export function getUser(db, id, cb) {
  return db.models.user.get(id)
      .then(function (user) {
        return cb(null, user.name);
      }).otherwise(function (err) {
        return cb(err, null);
      });
}
