function mapToObject(thing) {
  let obj = {};
  obj.id = thing.id;
  obj.name = thing.name.value;
  return obj;
}

export function getThingsById(db, id, cb) {
  let Thing = db.factory('Thing');
  return new Promise(function (resolve, reject) {
    Thing.find({user_id: id}, function (err, thingIds) {
      if (err) return cb(err, null);
      let things = [];
      if (!thingIds.length) return resolve(cb(null, things));
      let count = 0;
      thingIds.forEach(function (thingId) {
        Thing.load(thingId, function (thingErr, props) {
          if (thingErr) return reject(cb(thingErr, null));
          let thing = props;
          thing.id = thingId;
          things.push(thing);
          if (++count === thingIds.length) {
            return resolve(cb(null, things));
          }
        });
      });
    });
  });
}

export function addThingToUser(db, payload, cb) {
  let Thing = db.factory('Thing');
  Thing.p('name', payload.thing.name);
  Thing.p('user_id', payload.user.id);
  Thing.save(function (err) {
    if (err) cb(err, null);
    const thingWithId = mapToObject(Thing.properties);
    cb(null, thingWithId);
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
