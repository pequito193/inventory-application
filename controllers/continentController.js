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
    const name = req.body.name.toLowerCase();
    const population = req.body.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    const area = req.body.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    const countries = req.body.countries;

    // Check if the continent already exists
    Continent.countDocuments({name: name}, function(err, count) {
        console.log(count);
        if(count > 0) {
            res.render('error', {message: 'Continent already exists!'});
            return;
        }
    
        else {
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

            res.redirect('/catalog/continents');
        }
    })
}

// Display the delete continent page
exports.GET_continent_delete = function (req, res, next) {
    res.render('deleteContinent', {continent: req.params.id})
}

// Delete the continent
exports.POST_continent_delete = function (req, res, next) {
    Continent.findOneAndRemove({name: req.params.id}, (err) => {
        if (err) {
            return next(err);
        }
    })
    res.redirect('/catalog/continents');
}