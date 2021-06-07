
const orderModel = require('../models/order');

module.exports = {
	getById: function (req, res, next) {
		orderModel.findById(req.params.id, function (err, orderInfo) {
			if (err) {
				next(err);
			} else {
				res.status(200).json({ status: "Success", message: "Data found", data: { order: orderInfo } });
			}
		});
	},

	getAll: async function (req, res, next) {

		let n = parseInt(req.query.limit)

		let orders = await orderModel.find({}).limit(n)

		if(req.query.item) {
			orders = await orderModel.find({"item": req.query.item}).limit(n)
	   } else {
			orders = await orderModel.find({}).limit(n)
	   }

		if (orders) {
			res.status(200).json({ status: "Success", message: "Data found", orders });
		} else {
			next(err);
		}

	},

	updateById: function (req, res, next) {
		orderModel.findByIdAndUpdate(req.params.id, { name: req.body.name }, function (err, order) {

			if (err)
				next(err);
			else {
				res.status(200).json({ status: "Success", message: "Data updated", data: null });
			}
		});
	},

	deleteById: function (req, res, next) {
		orderModel.findByIdAndRemove(req.params.id, function (err, order) {
			if (err)
				next(err);
			else {
				res.status(200).json({ status: "Success", message: "Data deleted", data: null });
			}
		});
	},

	create: function (req, res, next) {
		orderModel.create({ name: req.body.name, description: req.body.description, price: req.body.price, restaurantId: req.body.restaurantId }, function (err, result) {
			if (err)
				next(err);
			else
				res.status(200).json({ status: "Success", message: "Date added", data: null });

		});
	},

}					