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
