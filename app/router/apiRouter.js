'use strict';

import {Router} from 'express';
let router = Router();

// Route imports
import user from '../services/user';
import thing from '../services/thing';

function respond(req, res) {
  res.send(JSON.stringify(res.payload));
}

router.get('/user', user.get, respond);
router.post('/user', user.create);

router.get('/thing', thing.get, respond);
router.post('/thing', thing.create);
router.put('/thing/:id', thing.update);
router.delete('/thing/:id', thing.del);

// catch 404 and forward to error handler
router.use(function (req, res) {
  res.status(404).send('Incorrect API route');
});

export default router;
