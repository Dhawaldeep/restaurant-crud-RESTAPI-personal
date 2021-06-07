const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const RateSchema = new Schema({
	name: String,
	date:  Date,
	rating: Number,
	comments: String
});

module.exports = mongoose.model('Rate', RateSchema)