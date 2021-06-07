const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');


router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.delete('/delete', userController.deleteById);
router.put('/update', userController.updateById);
router.get('/', userController.getAll);

module.exports = router;