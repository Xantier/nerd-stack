'use strict';

export function getUser(db, id, cb) {
  const User = db.model('User');
  return new Promise(function (resolve, reject) {
    User.findById(id, function (err, user) {
      if (err) {
        return reject(cb(err, null));
      }
      return resolve(cb(null, user.name));
    });
  });
}

export function addUser(db, payload, cb) {
  const User = new db.model('User')({name: payload.name});
  User.save(function (err, user) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, user._id);
    }
  });
}
