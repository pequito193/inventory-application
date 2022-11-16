const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CountrySchema = new Schema({
    name: {type: String, required: true},
    population: {type: Number},
    area: {type: Number},
    continent: {type: String, required: true},
    gdp: {type: Number}
});

CountrySchema.virtual('url').get(function() {
    return `/catalog/countries/${this._id}`;
})

module.exports = mongoose.model('CountrySchema', CountrySchema);