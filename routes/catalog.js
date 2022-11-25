var express = require('express');
var router = express.Router();

// Require controllers
const continentController = require('./../controllers/continentController');
const countryController = require('./../controllers/countryController');

// GET request for continent list
router.get('/continents', continentController.continent_list);

// GET request for continent details
router.get('/continents/:id', continentController.continent_details);

// GET request for country list
router.get('/countries', countryController.country_list);

// GET request for country details
router.get('/countries/:id', countryController.country_details);

module.exports = router;