'use strict';

var express = require('express');
var router = express.Router();

// Route imports
var user = require('../api/user');
var thing = require('../api/thing');

function respond(req, res) {
  res.send(JSON.stringify(res.payload));
}

router.get('/user', user.get, respond);
router.post('/user', user.create);

router.get('/thing', thing.get, respond);
router.post('/thing', thing.create);
router.put('/thing/:id', thing.update);
/*eslint-disable */
router.delete('/thing/:id', thing.del);
/*eslint-enable */

// catch 404 and forward to error handler
router.use(function (req, res) {
  res.status(404).send('Incorrect API route');
});

module.exports = router;
