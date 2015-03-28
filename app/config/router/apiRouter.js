'use strict';

var express = require('express');
var router = express.Router();

// Route imports
var user = require('../../api/user');

router.get('/user', user.index);
router.post('/user', user.create);

// catch 404 and forward to error handler
router.use(function (req, res) {
  res.status(404).send('Incorrect API route');
});

module.exports = router;
