const Country = require('../models/country_model');

// Displays list of countries
exports.GET_country_list = function (req, res, next) {
    Country.find({}, 'name')
    .sort({ name: 1 })
    .exec(function(err, list_countries) {
        if (err) {
            return next(err);
        }
        res.render('countries', {country_list: list_countries});
    });
};

// Displays country details
exports.GET_country_details = function (req, res, next) {
    Country.findOne({name: req.params.id})
    .exec(function(err, results) {
        if (err) {
            res.redirect('index');
            return;
        }
        if (results == null) {
            res.render('error', {message: `There is no country named ${req.params.id}`});
            return;
        }
        res.render('singleCountry', {data: results});
    });
};

// Display new country form
exports.GET_country_new = function (req, res, next) {
    res.render('newCountry');
}

// Create new country
exports.POST_country_new = function (req, res, next) {
    const name = req.body.name.toLowerCase();
    const population = req.body.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    const area = req.body.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    const continent = req.body.continent.toLowerCase();

    // Check if the country already exists
    Country.countDocuments({name: name}, function(err, count) {
        if(count > 0) {
            res.render('error', {message: 'Country already exists!'});
            return;
        }
    
        else {
            // Create the new country
            const country = new Country({
                name,
                population,
                area,
                continent
            });

            country.save((err) => {
                if (err) {
                    return next(err);
                }
            });

            res.redirect('/catalog/countries');
        }
    })
}

// Display the delete country page
exports.GET_country_delete = function (req, res, next) {
    res.render('deleteCountry', {country: req.params.id})
}

// Delete the country
exports.POST_country_delete = function (req, res, next) {
    Country.findOneAndRemove({name: req.params.id}, (err) => {
        if (err) {
            return next(err);
        }
    })
    res.redirect('/catalog/countries');
}

// Display the edit country page
exports.GET_country_edit = function (req, res, next) {
    Country.findOne({name: req.params.id})
    .exec(function(err, results) {
        if (err) {
            res.redirect('error');
            return;
        }
        res.render('editCountry', {data: results});
    });
}
