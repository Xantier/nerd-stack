'use strict';

function mapToObject(thing) {
  let obj = thing.toObject();
  obj.id = thing._id;
  return obj;
}

function mapToObjects(things) {
  if (!things) {
    return things;
  }
  return things.map(function (thing) {
    return mapToObject(thing);
  });
}

export function getThingsById(db, id, cb) {
  const User = db.model('User');
  return new Promise(function (resolve, reject) {
    User.findById(id, function (userErr, user) {
      if (userErr) {
        return reject(cb(userErr, null));
      }
      db.model('Thing').find({
        '_id': {$in: user.things}
      }, function (err, things) {
        if (err) {
          return reject(cb(err, null));
        }
        const thingsWithId = mapToObjects(things);
        return resolve(cb(null, thingsWithId));
      });
    });
  });
}

export function addThingToUser(db, payload, cb) {
  const User = db.model('User');
  return User.findById(payload.user.id, function (loadErr, user) {
    if (loadErr) {
      return cb(loadErr, null);
    }
    const ThingSchema = db.model('Thing');
    const Thing = new ThingSchema({name: payload.thing.name});
    Thing.save(function (thingErr, thing) {
      if (thingErr) {
        cb(thingErr, null);
      } else {
        user.things.push(Thing);
        user.save(function (userErr) {
          if (userErr) {
            cb(userErr, null);
          } else {
            const thingWithId = mapToObject(thing);
            cb(null, thingWithId);
          }
        });
      }
    });
  });
}

export function deleteThing(db, id, cb) {
  const Thing = db.model('Thing');
  Thing.findById(id, function (err, thing) {
    if (err) {
      cb(err);
    }
    thing.remove(function (deletionErr) {
      if (deletionErr) {
        cb(deletionErr);
      } else {
        cb(null);
      }
    });
  });
}

export function updateThing(db, payload, cb) {
  const Thing = db.model('Thing');
  Thing.findById(payload.thingId, function (err, thing) {
    if (err) {
      cb(err);
    } else {
      thing.name = payload.thing.name;
      thing.save(function (saveErr, savedThing) {
        if (saveErr) {
          cb(err, null);
        } else {
          const thingWithId = mapToObject(savedThing);
          cb(null, thingWithId);
        }
      });
    }
  });
}
