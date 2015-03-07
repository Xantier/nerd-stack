var express = require('express');
var router = express.Router();
var User = require('./userModel');

/* GET users listing. */
router.get('/', function (req, res, next) {
   new User().fetch()
      .then(function (model) {
         res.send(model.get('name'));
      });
});

module.exports = router;
