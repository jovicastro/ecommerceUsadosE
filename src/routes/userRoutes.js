const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// rota para logon
router.post('/register', userController.registerUser);
// rota para login
router.post('api/users/login')

module.exports = router;