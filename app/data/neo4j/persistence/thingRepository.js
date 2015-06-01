'use strict';

function mapToObject(thing) {
  let obj = {};
  obj.id = thing.id;
  obj.name = thing.name.value;
  return obj;
}

export function getThingsById(db, id, cb) {
  return new Promise(function (resolve, reject) {
    db.models.user.read(id, function (err, user) {
      if (err) return reject(cb(err, null));
      return resolve(cb(null, user.things));
    });
  });
}

export function addThingToUser(db, payload, cb) {
  db.models.user.read(payload.user.id, function (err, user) {
    if (err) cb(err, null);
    if (!user.things) user.things = [];
    user.things.push({
      name: payload.thing.name
    });
    db.models.user.saveComposition(user.id, 'things', user.things, function (compositionErr, things) {
      if (compositionErr) cb(compositionErr, null);
      cb(null, things[0]);
    });
  });
}

export function deleteThing(db, id, cb) {
  let Thing = db.factory('Thing');
  Thing.id = id;
  Thing.remove(function (err) {
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  });
}

export function updateThing(db, payload, cb) {
  const Thing = db.factory('Thing');
  Thing.id = payload.thingId;
  Thing.load(payload.thingId, function (err) {
    if (err) cb(err, null);
    Thing.p('name', payload.thing.name);
    Thing.save(function (saveErr) {
      if (saveErr) cb(saveErr, null);
      const thingWithId = mapToObject(Thing.properties);
      cb(null, thingWithId);
    });
  });

}
