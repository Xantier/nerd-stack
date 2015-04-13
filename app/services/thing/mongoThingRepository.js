'use strict';

export function getThingsById(db, id, cb) {
  const User = db.model('User');
  return User.findById(id, function (userErr, user) {
    if (userErr) {
      return cb(userErr, null);
    }
    db.model('Thing').find({
      '_id': {$in: user.things}
    }, function (err, things) {
      if (err) {
        return cb(err, null);
      }
      return cb(null, things);
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
            cb(null, thing);
          }
        });
      }
    });
  });
}
export function deleteThing(db, id, cb) {
  const Thing = db.model('Thing');
  Thing.findByID(id, function (err, thing) {
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
  const Thing = db.model9('Thing');
  Thing.findByID(payload.thingId, function (err, thing) {
    if (err) {
      cb(err);
    } else {
      thing.name = payload.thing.name;
      thing.save(function (savedThing) {
        cb(null, savedThing);
      });
    }
  });
}
