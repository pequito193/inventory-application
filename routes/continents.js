var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('continents');
});

// router.get('/:id', function(req, res, next) {
//   const continent = req.body.id;

// })

module.exports = router;
