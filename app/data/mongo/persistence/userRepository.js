export function getUser(db, id, cb) {
  const User = db.model('User');
  return User.findById(id).exec()
      .then(function (user) {
        return cb(null, user.name);
      }).onReject(function (err) {
        return cb(err, null);
      });
}
