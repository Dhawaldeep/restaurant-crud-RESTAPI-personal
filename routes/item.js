const express = require('express');
const router = express.Router();
const itemController = require('../app/api/controllers/item');

router.get('/', itemController.getAll);
router.post('/', itemController.create);
router.get('/:id', itemController.getById);
router.put('/:id', itemController.updateById);
router.delete('/:id', itemController.deleteById);
router.get('/name/:name', itemController.getByName);

module.exports = router;