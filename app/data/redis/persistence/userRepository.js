export function getUser(db, id, cb) {
  const User = db.factory('User');
  return new Promise(function (resolve, reject) {
    User.load(id, function (err, user) {
      if (err) {
        return reject(cb(err, null));
      }
      return resolve(cb(null, user.name));
    });
  });
}
