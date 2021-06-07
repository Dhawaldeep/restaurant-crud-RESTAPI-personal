const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
	name: String,
	quantity: Number,
	price: Number,
	restaurantId: String
});

module.exports = mongoose.model('Order', OrderSchema)