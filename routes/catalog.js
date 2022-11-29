var express = require('express');
var router = express.Router();

// Require controllers
const continentController = require('./../controllers/continentController');
const countryController = require('./../controllers/countryController');

// GET request for continent list
router.get('/continents', continentController.GET_continent_list);

// GET request for continent details
router.get('/continents/:id', continentController.GET_continent_details);

// GET request for new continent form
router.get('/new-continent', continentController.GET_continent_new)

router.post('/new-continent', continentController.POST_continent_new)

// GET request for country list
router.get('/countries', countryController.GET_country_list);

// GET request for country details
router.get('/countries/:id', countryController.GET_country_details);

module.exports = router;