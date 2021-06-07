const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
		name: String,
		category: String,
		about: String,
		hours: String,
		deliveryTime: Number
	});

module.exports = mongoose.model('Restaurant', RestaurantSchema)