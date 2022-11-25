const Continent = require('../models/continent_model');

// Displays list of continents
exports.continent_list = function (req, res, next) {
    Continent.find({}, 'name')
    .sort({ name: 1 })
    .exec(function(err, list_continents) {
        if (err) {
            return next(err);
        }
        res.render('continents', {continent_list: list_continents});
    });
};

// Displays continent details
exports.continent_details = function (req, res, next) {
    Continent.find({name: req.params.id})
    .exec(function(err, continent) {
        if (err) {
            res.render('error', {message: `There is no continent named ${req.params.id}`, redirect: '/catalog/continents'});
        }
        res.render('singleContinent', {continent: continent});
    });
};