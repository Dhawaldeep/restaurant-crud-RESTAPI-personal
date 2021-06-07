const mongoose = require('mongoose');
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: String,
	email: String,
	password: Number,

});

UserSchema.pre('save', (next) =>{
	
	console.log(this);
	console.log(this.password);
	console.log(UserSchema.password);
 
	
	this.password = bcrypt.hash(this.password, saltRounds);
	next();
});

module.exports = mongoose.model('User', UserSchema);