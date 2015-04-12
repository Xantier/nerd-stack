'use strict';

export function getThingsById(db, id, cb) {
  const User = db.model('User');
  return User.findById(id, function (err, user) {
    if (err) {
      return cb(err, null);
    }
    return cb(null, user.things);
  });
}
export function addThingToUser(db, payload, cb) {
  const User = db.model('User');
  return User.findById(payload.user.id, function (err, user) {
    if (err) {
      return cb(err, null);
    }
    const ThingSchema = db.model('Thing').schema;
    console.log(ThingSchema);
    const Thing = new ThingSchema({name: payload.thing.name});
    Thing.save(function (err2, thing) {
      if (err2) {
        cb(err2, null);
      } else {
        user.things.push(Thing);
        user.save(function (err3) {
          if (err3) {
            cb(err3, null);
          } else {
            cb(null, thing);
          }
        });
      }
    });
  });
}
export function deleteThing(db, id, cb) {
  const Thing = db.models.Thing;
  Thing.forge({id: id})
      .fetch({require: true})
      .then(function (thing) {
        thing.destroy().then(function () {
          cb(null);
        });
      })
      .otherwise(function (err) {
        cb(err);
      });
}
export function updateThing(db, payload, cb) {
  const Thing = db.models.Thing;
  Thing.forge({id: payload.thingId})
      .fetch({require: true})
      .then(function (thing) {
        thing.set({name: payload.thing.name}).save()
            .then(function (savedThing) {
              cb(null, savedThing);
            })
            .otherwise(function (err) {
              cb(err, null);
            });
      });
}
