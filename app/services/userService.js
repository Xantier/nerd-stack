import config from '../config/config.json';
const userRepository = require('../data/' + config.db + '/persistence/userRepository');

export default {
  get(req, res, next) {
    return userRepository.getUser(req.db, req.user.id, (err, user) => {
      if (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      }
      res.payload = {user: user};
      return next();
    });
  },

  add(req, res) {
    const payload = {
      name: req.body.name
    };
    userRepository.addUser(req.db, payload, (err, user) => {
      if (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      } else {
        res.json({error: false, data: {id: user.id}});
      }
    });
  }
};
