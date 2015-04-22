'use strict';

export function getThingsById(db, id, cb) {
  return db.models.user.get(id).then(function (user) {
    console.log(user.things);
    return cb(null, user.things);
  }).error(function (err) {
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
  }).error(function (err) {
    cb(err, null);
  });
}
export function deleteThing(db, id, cb) {
  db.models.thing.get(id).then(function (thing) {
    thing.delete().then(function () {
      cb(null);
    }).error(function (err) {
      cb(err, null);
    });
  });
}
export function updateThing(db, payload, cb) {
  db.models.thing.get(payload.thingId).then(function (thing) {
    thing.name = payload.thing.name;
    thing.save().then(function (savedThing) {
      cb(null, savedThing);
    }).error(function (err) {
      cb(err, null);
    });
  });
}
