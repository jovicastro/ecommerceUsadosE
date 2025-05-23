// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// ... (outras rotas como GET / para listar, GET /:id para buscar por ID) ...

// Rota para cadastrar um novo produto (POST)
// Onde o seu frontend fará um POST para, por exemplo, http://localhost:3000/api/products
router.post('/', productController.createProduct);

module.exports = router;