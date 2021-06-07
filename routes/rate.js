const express = require('express');
const router = express.Router();
const rateController = require('../app/api/controllers/rate');

router.get('/', rateController.getAll);
router.post('/', rateController.create);
router.get('/:id', rateController.getById);
router.put('/:id', rateController.updateById);
router.delete('/:id', rateController.deleteById);

module.exports = router;