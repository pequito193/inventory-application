const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContinentSchema = new Schema({
    name: {type: String, required: true},
    population: {type: Number},
    area: {type: Number},
    countries: {type: Number}
});

ContinentSchema.virtual('url').get(function() {
    return `/catalog/continents/${this._id}`;
})

module.exports = mongoose.model('ContinentSchema', ContinentSchema);