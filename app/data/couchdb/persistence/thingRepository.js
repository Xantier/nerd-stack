export function getThingsById(db, id, cb) {
  return new Promise(function (resolve, reject) {
    db.view('thing/byUserId', {key: id}, function (err, things) {
      if (err) return reject(cb(err, null));
      if (!things.length) return resolve(cb(null, things));
      let count = 0;
      let returnables = [];
      things.forEach(function (thing) {
        let returnable = {};
        returnable.id = thing._id;
        returnable.name = thing.name;
        returnables.push(returnable);
        if (++count === things.length) {
          return resolve(cb(null, returnables));
        }
      });
    });
  });
}

export function addThingToUser(db, payload, cb) {
  let newThing = {
    name: payload.thing.name,
    user_id: payload.user.id,
    document_type: 'thing'
  };
  db.save(newThing, function (saveErr, res) {
    if (saveErr) {
      throw saveErr;
    }
    newThing.id = res.id;
    cb(null, newThing);
  });
}

export function deleteThing(db, id, cb) {
  db.remove(id, function (err) {
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  });
}

export function updateThing(db, payload, cb) {
  db.merge(payload.thingId, {name: payload.thing.name }, function (err, res) {
    if (err) {
      cb(err);
    } else {
      let returnable = {};
      returnable.name = payload.thing.name;
      returnable.id = res.id;
      cb(null, returnable);
    }
  });
}
