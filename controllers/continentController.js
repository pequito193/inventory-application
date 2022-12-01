const Continent = require('../models/continent_model');

function stringify(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
    Continent.findOne({name: req.params.id})
    .exec(function(err, results) {
        if (err) {
            res.redirect('error');
            return;
        }
        if (results == null) {
            res.render('error', {message: `There is no continent named ${req.params.id}`});
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
    const population = stringify(req.body.population);
    const area = stringify(req.body.area);
    const countries = stringify(req.body.countries);

    // Check if the continent already exists
    Continent.countDocuments({name: name}, function(err, count) {
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

// Display the edit continent page
exports.GET_continent_edit = function (req, res, next) {
    Continent.findOne({name: req.params.id})
    .exec(function(err, results) {
        if (err) {
            res.redirect('error');
            return;
        }
        res.render('editContinent', {data: results});
    });
}

// Edit the continent
exports.POST_continent_edit = function (req, res, next) {
    const name = req.body.name.toLowerCase();
    const population = stringify(req.body.population);
    const area = stringify(req.body.area);
    const countries = stringify(req.body.countries);
    Continent.findOneAndUpdate({name: req.params.id}, {$set:{
        name,
        population,
        area,
        countries
    }}, {new: true}, (err) => {
        if(err) {
            res.redirect('error');
        }
    });
    res.redirect(`/catalog/continents/${req.params.id}`);
}