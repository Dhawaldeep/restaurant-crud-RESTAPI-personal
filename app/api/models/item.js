const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
	name: String,
	description: String,
	price: Number,
	restaurantId: String
});

module.exports = mongoose.model('Item', ItemSchema)