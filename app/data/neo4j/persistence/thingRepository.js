export function getThingsById(db, id, cb) {
  return new Promise(function (resolve, reject) {
    db.models.user.read(id, function (err, user) {
      if (err) return reject(cb(err, null));
      if (Array.isArray(user.things)) {
        return resolve(cb(null, user.things));
      }
      if (user.things) {
        return resolve(cb(null, [].concat(user.things)));
      }
      return resolve(cb(null, []));
    });
  });
}

export function addThingToUser(db, payload, cb) {
  const newThing = {
    name: payload.thing.name
  };
  db.models.user.push(payload.user.id, 'things', newThing, function (compositionErr, savedThing) {
    if (compositionErr) cb(compositionErr, null);
    cb(null, savedThing);
  });
}

export function deleteThing(db, id, cb) {
  db.delete(id, true, function (err) {
    if (err) {
      cb(err);
    } else {
      cb(null, parseInt(id, 10));
    }
  });
}

export function updateThing(db, payload, cb) {
  db.models.thing.read(payload.thingId, function (err, thing) {
    if (err) cb(err, null);
    thing.name = payload.thing.name;
    db.models.thing.save(thing, function (saveErr) {
      if (saveErr) cb(saveErr, null);
      cb(null, thing);
    });
  });
}
