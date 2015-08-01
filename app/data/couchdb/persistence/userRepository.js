export function getUser(db, id, cb) {
  return new Promise(function (resolve, reject) {
    db.get(id, function (err, user) {
      if (err) {
        return reject(cb(err, null));
      }
      return resolve(cb(null, user.name));
    });
  });
}
