// src/routes/cartRoutes.js

const express = require('express');
const router = express.Router();

// Tarefa A: Importe as ferramentas necessárias.
// O que precisamos importar aqui? (O controller do carrinho e o middleware de autenticação).
const cartController = require('../controllers/cartController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

// Tarefa B: Crie a rota POST para adicionar itens.
// Lembre-se de colocar o "segurança" na porta!
// O caminho pode ser simplesmente '/', pois o prefixo virá do server.js
// A rota completa será: POST /api/cart
router.post('/', authMiddleware, cartController.addItemToCart);
router.get('/', authMiddleware, cartController.getCart); 

// ... outras rotas do carrinho (GET para ver o carrinho, DELETE para remover item) virão aqui no futuro ...

module.exports = router;