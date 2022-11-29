const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CountrySchema = new Schema({
    name: {type: String, required: true},
    population: {type: String},
    area: {type: String},
    continent: {type: String, required: true},
    gdp: {type: String}
});

CountrySchema.virtual('url').get(function() {
    return `/catalog/countries/${this.name}`;
})

module.exports = mongoose.model('Countries', CountrySchema);