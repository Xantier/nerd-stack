export function getUser(db, id, cb) {
  return new Promise(function (resolve, reject) {
    return db.models.user.read(id, function (err, user) {
      if (err) {
        return reject(cb(err, null));
      }
      return resolve(cb(null, user.name));
    });
  });
}
