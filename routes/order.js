const express = require('express');
const router = express.Router();
const orderController = require('../app/api/controllers/order');

router.get('/', orderController.getAll);
router.post('/', orderController.create);
router.get('/:id', orderController.getById);
router.put('/:id', orderController.updateById);
router.delete('/:id', orderController.deleteById);

module.exports = router;