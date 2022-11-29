const Continent = require('../models/continent_model');

// Displays list of continents
exports.GET_continent_list = function (req, res, next) {
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
exports.GET_continent_details = function (req, res, next) {
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

// Display new continent form
exports.GET_continent_new = function (req, res, next) {
    res.render('newContinent');
}

// Create new continent
exports.POST_continent_new = function (req, res, next) {
    const name = req.body.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
    const population = req.body.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    const area = req.body.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    const countries = req.body.countries;
    console.log(Continent.countDocuments({name: name}));

    // Check if the named continent already exists
    if (Continent.find({name: name})) {
        res.render('error', {message: 'Continent already exists!', redirect: '/catalog/continents'});
        return;
    }

    // Create the new continent
    const continent = new Continent({
        name,
        population,
        area,
        countries
    });

    continent.save((err) => {
        if (err) {
            return next(err);
        }
    });

    res.redirect('continents');
}