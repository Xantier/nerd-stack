import {Router} from 'express';
let router = new Router();

// Route imports
import user from '../services/userService';
import thing from '../services/thingService';

// For isomorphic dataloads. This is overridden for server rendered data/views
function respond(req, res) {
  res.send(JSON.stringify(res.payload));
}

router.get('/user', user.get, respond);
router.post('/user', user.add);

router.get('/thing', thing.get, respond);
router.post('/thing', thing.add);
router.put('/thing/:id', thing.set);
router.delete('/thing/:id', thing.del);

// catch 404 and forward to error handler
router.use(function (req, res) {
  res.status(404).send('Incorrect API route');
});
export default router;
export const stack = router.stack;
