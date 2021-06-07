
const restaurantModel = require('../models/restaurant');

module.exports = {
	getById: function (req, res, next) {
		restaurantModel.findById(req.params.id, function (err, restaurant) {
			if (err) {
				next(err);
			} else {
				res.status(200).json({ status: "Success", message: "Data found", data: { movies: restaurant } });
			}
		});
	},

	getByName: function (req, res, next) {
		console.log(req.params.name)
				restaurantModel.findOne({"name": req.params.name}, function (err, restaurant) {
			if (err) {
				next(err);
			} else {
				res.status(200).json({ status: "Success", message: "Data found", data: { restaurant: restaurant } });
			}
		});
	},

	getAll: async function (req, res, next) {
		let n = parseInt(req.query.limit)
		let restaurants
		if(req.query.category) {
			 restaurants = await restaurantModel.find({"category": req.query.category}).limit(n)
		} else {
			 restaurants = await restaurantModel.find({}).limit(n)
		}


			if (restaurants) {
				res.status(200).json({ status: "Success", message: "Data found", restaurants });
			} else {
				next(err);
			}		
	},

	updateById: function (req, res, next) {
		restaurantModel.findByIdAndUpdate(req.params.id, { name: req.body.name }, function (err, restaurant) {
			if (err)
				next(err);
			else {
				res.status(200).json({ status: "Success", message: "Data updated", data: null });
			}
		});
	},

	deleteById: function (req, res, next) {
		restaurantModel.findByIdAndRemove(req.params.id, function (err, restaurant) {
			if (err)
				next(err);
			else {
				res.status(200).json({ status: "Success", message: "Data deleted", data: null });
			}
		});
	},

	create: async function (req, res, next) {

		let check = await restaurantModel.findOne({ "name": req.body.name })

		if (check != null) {
			res.status(400).json({ status: "fail", message: "Restaurant already exists", data: null });
		} else {

			restaurantModel.create({
				name: req.body.name,
				category: req.body.category,
				about: req.body.about,
				hours: req.body.hours,
				deliveryTime: req.body.deliveryTime
			}, function (err, result) {
				if (err)
					next(err);
				else
					res.status(200).json({ status: "Success", message: "Date added", data: null });

			});
		}
	},

}					