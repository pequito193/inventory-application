const Country = require('../models/country_model');

// Displays list of continents
exports.GET_country_list = (req, res, next) => {
    Country.find({}, 'name')
    .sort({name: 1})
    .exec(function(err, list_countries) {
        if (err) {
            return next(err);
        }
        res.render('countries', {countries: list_countries});
    });
};

// Displays continent details
exports.GET_country_details = (req, res, next) => {
    Country.find({name: req.params.id})
    .exec(function(err, country) {
        if (err) {
            res.render('error', {message: `There is no country named ${req.params.id}`, redirect: '/catalog/countries'});
        }
        res.render('singleCountry', {country: country});
    });
};
