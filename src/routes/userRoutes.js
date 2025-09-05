const express = require('express');
const router = express.Router();

 const userController = require('../controllers/userController');
 const User = require('../models/User');

 router.get('/', userController.getAllUsers);
 router.post('/', userController.createUser);
 //Implementar a update ('/:id')
 router.patch('/:id', userController.updateUser);
 //Implementar a delete ('/:id')
 router.delete('/:id', userController.deleteUser);
 module.exports = router;