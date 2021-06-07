const express = require('express');
const router = express.Router();
const restaurantController = require('../app/api/controllers/restaurant');

router.get('/', restaurantController.getAll);
router.post('/', restaurantController.create);
router.get('/:id', restaurantController.getById);
router.get('/name/:name', restaurantController.getByName);
router.put('/:id', restaurantController.updateById);
router.delete('/:id', restaurantController.deleteById);

module.exports = router;