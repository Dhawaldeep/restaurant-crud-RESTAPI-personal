
const rateModel = require('../models/rate');

module.exports = {
	getById: function (req, res, next) {
		rateModel.findById(req.params.id, function (err, rateInfo) {
			if (err) {
				next(err);
			} else {
				res.status(200).json({ status: "Success", message: "Data found", data: { movies: rateInfo } });
			}
		});
	},

	getAll: async function (req, res, next) {
		let n = parseInt(req.query.limit)

		let rates = await rateModel.find({}).limit(n)

		if(req.query.date) {
			 rates = await rateModel.find({"date": req.query.date}).limit(n)
		} else {
			 rates = await rateModel.find({}).limit(n)
		}
		
		if (rates) {
			res.status(200).json({ status: "Success", message: "Data found", rates });
		} else {
			next(err);
		}
	},

	updateById: function (req, res, next) {
		rateModel.findByIdAndUpdate(req.params.id, { name: req.body.name }, function (err, rate) {

			if (err)
				next(err);
			else {
				res.status(200).json({ status: "Success", message: "Data updated", data: null });
			}
		});
	},

	deleteById: function (req, res, next) {
		rateModel.findByIdAndRemove(req.params.id, function (err, rate) {
			if (err)
				next(err);
			else {
				res.status(200).json({ status: "Success", message: "Data deleted", data: null });
			}
		});
	},

	create: function (req, res, next) {
		rateModel.create({ name: req.body.name, date: req.body.date, rating: req.body.rating, comments: req.body.comments }, function (err, result) {
			if (err)
				next(err);
			else
				res.status(200).json({ status: "Success", message: "Date added", data: null });

		});
	},

}					