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

// POST request to create a new continent
router.post('/new-continent', continentController.POST_continent_new)

// GET request for continent delete page
router.get('/continents/:id/delete', continentController.GET_continent_delete)

// POST request to delete a continent
router.post('/continents/:id/delete', continentController.POST_continent_delete)

// GET request for continent edit page
router.get('/continents/:id/edit', continentController.GET_continent_edit)

// POST request to edit a continent
router.post('/continents/:id/edit', continentController.POST_continent_edit)

// ---------------------------------------------------------------------------------------------------------------

// GET request for country list
router.get('/countries', countryController.GET_country_list);

// GET request for country details
router.get('/countries/:id', countryController.GET_country_details);

// GET request for new country form
router.get('/new-country', countryController.GET_country_new)

// POST request to create a new country
router.post('/new-country', countryController.POST_country_new)

// GET request for country delete page
router.get('/countries/:id/delete', countryController.GET_country_delete)

// POST request to delete a country
router.post('/countries/:id/delete', countryController.POST_country_delete)

// GET request for country edit page
router.get('/countries/:id/edit', countryController.GET_country_edit)

// POST request to edit a country
router.post('/countries/:id/edit', countryController.POST_country_edit)

module.exports = router;