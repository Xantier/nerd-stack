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
  let User = db.factory('User');
  return User.load(id, function (err) {
    if (err) return cb(err, null);
    return User.getAll('Thing', 'hasThings', function (getAllErr, thingIds) {
      console.log(thingIds);
      if (getAllErr) return cb(getAllErr, null);
      let things = [];
      let count = 0;
      thingIds.forEach(function (thingId) {
        db.factory('Thing', thingId, function (thingErr, props) {
          if (thingErr) return cb(thingErr, null);
          let thing = props;
          thing.id = thingId;
          things.push(thing);
          if (++count === thingIds.length) {
            return cb(null, things);
          }
        });
      });
    });
  });
}

export function addThingToUser(db, payload, cb) {
  let User = db.factory('User');
  let Thing = db.factory('Thing');
  Thing.p('name', payload.thing.name);
  return User.find(payload.user.id, function (err) {
    if (err) cb(err, null);
    User.link(Thing, {
      name: 'hasThings'
    });
    return User.save(function (saveErr, linkErr, linkedObjectErr) {
      if (saveErr) cb(saveErr, null);
      if (linkErr) cb(linkErr, null);
      if (linkedObjectErr) cb(linkedObjectErr, null);
    });
  });
}

export function deleteThing(db, id, cb) {
  const Thing = db.model('Thing');
  Thing.findById(id).exec().then(function (thing) {
    thing.remove(function (err) {
      if (err) {
        cb(err);
      } else {
        cb(null);
      }
    });
  });
}

export function updateThing(db, payload, cb) {
  const Thing = db.model('Thing');
  Thing.findById(payload.thingId).exec().then(function (thing) {
    thing.name = payload.thing.name;
    return thing.save();
  }).then(function (savedThing) {
    const thingWithId = mapToObject(savedThing);
    cb(null, thingWithId);
  }).onReject(function (err) {
    cb(err, null);
  });
}
