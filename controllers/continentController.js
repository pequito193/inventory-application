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
    .exec(function(err, results) {
        if (err) {
            res.redirect('index');
            return;
        }
        if (results == null) {
            res.render('error', {message: `There is no continent named ${req.params.id}`, redirect: '/catalog/continents'});
            return;
        }
        res.render('singleContinent', {data: results});
    });
};

// Create a new continent
exports.continent_new = function (req, res, next) {
    res.render('newContinent');
}