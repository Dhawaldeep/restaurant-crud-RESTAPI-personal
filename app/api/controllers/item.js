
const itemModel = require('../models/item');

module.exports = {
	getById: function (req, res, next) {
		console.log('entriu')
		console.log(req.params.id)
		itemModel.findById(req.params.id, function (err, itemInfo) {
			if (err) {
				next(err);
			} else {
				res.status(200).json({ status: "Success", message: "Data found", data: { item: itemInfo } });
			}
		});
	},
	getByName: function (req, res, next) {
				itemModel.findOne({"name": req.params.name}, function (err, item) {
			if (err) {
				next(err);
			} else {
				res.status(200).json({ status: "Success", message: "Data found", data: { item: item } });
			}
		});
	},

	getAll: async function (req, res, next) {		
		let n = parseInt(req.query.limit)
		let items = await itemModel.find({}).limit(n)
	
		if (req.query.restaurantId) {
			items = await itemModel.find({ "restaurantId": req.query.restaurantId }).limit(n)
		} else {
			items = await itemModel.find({}).limit(n)
		}

		if (items) {
			res.status(200).json({ status: "Success", message: "Data found", items });
		} else {
			next(err);
		}
	},

	updateById: function (req, res, next) {
		itemModel.findByIdAndUpdate(req.params.id, { name: req.body.name }, function (err, item) {

			if (err)
				next(err);
			else {
				res.status(200).json({ status: "Success", message: "Data updated", data: null });
			}
		});
	},

	deleteById: function (req, res, next) {
		itemModel.findByIdAndRemove(req.params.id, function (err, item) {
			if (err)
				next(err);
			else {
				res.status(200).json({ status: "Success", message: "Data deleted", data: null });
			}
		});
	},

	create: async function (req, res, next) {

		let item = await itemModel.findOne({ "name": req.body.name })

		if (item != null) {
			res.status(400).json({ status: "fail", message: "Item already exists", data: null });
		} else {
			itemModel.create({ 'name': req.body.name, 'description': req.body.description, 'price': req.body.price, 'restaurantId': req.body.restaurantId }, function (err, result) {
				if (err)
					next(err);
				else
					res.status(200).json({ status: "Success", message: "Date added", data: null });

			});
		}
	},

}					