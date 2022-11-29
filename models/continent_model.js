const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContinentSchema = new Schema({
    name: {type: String, required: true},
    population: {type: String},
    area: {type: String},
    countries: {type: String}
});

ContinentSchema.virtual('url').get(function() {
    return `/catalog/continents/${this.name}`;
})

module.exports = mongoose.model('Continents', ContinentSchema);