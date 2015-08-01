export function getThingsById(db, id, cb) {
  return db.models.user.get(id).getJoin().run().then(function (user) {
    return cb(null, user.things);
  }).catch(function (err) {
    return cb(err, null);
  });
}

export function addThingToUser(db, payload, cb) {
  const newThing = new db.models.thing({
    name: payload.thing.name,
    user_id: payload.user.id
  });
  newThing.save().then(function (thing) {
    cb(null, thing);
  }, function (err) {
    cb(err, null);
  });
}

export function deleteThing(db, id, cb) {
  db.models.thing.get(id).getJoin().run().then(function (thing) {
    thing.delete().then(function () {
      cb(null);
    }).catch(function (err) {
      cb(err);
    });
  });
}

export function updateThing(db, payload, cb) {
  db.models.thing.get(payload.thingId).getJoin().run().then(function (thing) {
    thing.name = payload.thing.name;
    thing.save().then(function (savedThing) {
      cb(null, savedThing);
    }).catch(function (err) {
      cb(err, null);
    });
  });
}
