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
  return User.findById(id).exec().then(function (user) {
    return db.model('Thing').find({
      '_id': {$in: user.things}
    }).exec();
  }).then(function (things) {
    const thingsWithId = mapToObjects(things);
    return cb(null, thingsWithId);
  }).onReject(function (err) {
    return cb(err, null);
  });
}

export function addThingToUser(db, payload, cb) {
  const User = db.model('User');
  const ThingSchema = db.model('Thing');
  const Thing = new ThingSchema({name: payload.thing.name});
  let thingWithId;
  return Thing.save().then(function (thing) {
    thingWithId = mapToObject(thing);
    return User.findById(payload.user.id).exec();
  }).then(function (user) {
    user.things.push(Thing);
    return user.save();
  }).then(function () {
    cb(null, thingWithId);
  }).onReject(function (err) {
    cb(err, null);
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
