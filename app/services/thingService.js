import config from '../config/config.json';
import respond from './responder.js';
const thingRepository = require('../data/' + config.db + '/persistence/thingRepository');

export default {
  get(req, res, next) {
    return thingRepository.getThingsById(req.db, req.user.id, (err, collection)=> {
      if (err) {
        res.payload = {error: true, data: {message: err.message}};
        res.status(500).json({error: true, data: {message: err.message}});
      } else {
        res.payload = {things: collection};
      }
      return next();
    });
  },

  add(req, res) {
    const payload = {
      user: req.user,
      thing: req.body
    };
    thingRepository.addThingToUser(req.db, payload, (err, thing) => {
      let data = {};
      if (err) {
        data = {error: true, data: {message: err.message}};
      } else {
        data = {error: false, data: thing};
      }
      respond(req, res, data);
    });
  },

  del(req, res) {
    thingRepository.deleteThing(req.db, req.params.id, (err, id) => {
      let data;
      if (err) {
        data = {error: true, data: {message: err.message}};
      } else {
        const deleteId = id || req.params.id;
        data = {error: false, data: {message: 'Thing deleted', id: deleteId}};
      }
      respond(req, res, data);
    });
  },

  set(req, res) {
    const payload = {
      thing: req.body,
      thingId: req.params.id
    };
    thingRepository.updateThing(req.db, payload, (err, thing)=> {
      let data;
      if (err) {
        data = {error: true, data: {message: err.message}};
      } else {
        data = {error: false, data: thing};
      }
      respond(req, res, data);
    });
  }
};
