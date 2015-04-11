'use strict';

import * as userDAO from './bookshelfUserRepository';

export default {
  get(req, res, next) {
    return userDAO.getUser(req.db, req.user.id, (err, user)=> {
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
    userDAO.addUser(req.db, payload, (err, user)=> {
      if (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      }
      res.json({error: false, data: {id: user.get('id')}});
    });
  }
};
