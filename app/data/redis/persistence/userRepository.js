'use strict';

export function getUser(db, id, cb) {
  const User = db.factory('User');
  return User.load(id, function (err, user) {
    if (err) {
      return cb(err, null);
    }
    return cb(null, user.name);
  });
}

export function addUser(db, payload, cb) {
  const User = new db.model('User')({name: payload.name});
  User.save().then(function (user) {
    cb(null, user._id);
  }).onReject(function (err) {
    return cb(err, null);
  });
}
