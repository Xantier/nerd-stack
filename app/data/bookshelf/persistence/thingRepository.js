export function getThingsById(db, id, cb) {
  const Things = new db.models.Things();
  return Things.query({where: {'user_id': id}})
      .fetch()
      .then(function (collection) {
        return cb(null, collection.toJSON());
      })
      .otherwise(function (err) {
        return cb(err, null);
      });
}
export function addThingToUser(db, payload, cb) {
  const Thing = db.models.Thing;
  Thing.forge({
    name: payload.thing.name,
    user_id: payload.user.id
  }).save()
      .then(function (thing) {
        cb(null, thing);
      })
      .otherwise(function (err) {
        cb(err, null);
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
