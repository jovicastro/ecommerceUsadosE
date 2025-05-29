// src/routes/productRoutes.js

// 1. Importa o Express
const express = require('express');

// 2. Cria um objeto Router do Express
// O Router é como um "mini-aplicativo" Express que pode ter suas próprias rotas e middlewares.
// Ele nos ajuda a organizar as rotas de forma modular.
const router = express.Router();

// 3. Importa o controlador de produto que criamos anteriormente
// Este objeto contém as funções que lidarão com a lógica para cada rota (ex: createProduct).
const productController = require('../controllers/productController.js');

// 4. Define as rotas específicas para produtos

// Rota para CRIAR (cadastrar) um novo produto:
// - Método HTTP: POST
// - Caminho: '/' (Este caminho é relativo ao prefixo que usaremos ao montar este router no server.js.
//   Se montarmos em '/api/products', o caminho completo para esta rota será POST /api/products/)
// - Ação: Chama a função 'createProduct' do nosso 'productController'.
router.post('/', productController.createProduct);

// --- Futuras Rotas para Produtos ---
// Aqui você poderá adicionar outras rotas para diferentes funcionalidades com produtos:

// Exemplo: Rota para LISTAR todos os produtos
// - Método HTTP: GET
// - Caminho: '/' (Ou seja, GET /api/products/)
// - Ação: Chamaria uma função como productController.getAllProducts (que precisaríamos criar)
// router.get('/', productController.getAllProducts);

// Exemplo: Rota para BUSCAR um produto específico pelo ID
// - Método HTTP: GET
// - Caminho: '/:id' (O ':id' é um parâmetro de rota, ex: GET /api/products/123)
// - Ação: Chamaria productController.getProductById
// router.get('/:id', productController.getProductById);

// Exemplo: Rota para ATUALIZAR um produto específico pelo ID
// - Método HTTP: PUT
// - Caminho: '/:id' (Ex: PUT /api/products/123)
// - Ação: Chamaria productController.updateProduct
// router.put('/:id', productController.updateProduct);

// Exemplo: Rota para DELETAR um produto específico pelo ID
// - Método HTTP: DELETE
// - Caminho: '/:id' (Ex: DELETE /api/products/123)
// - Ação: Chamaria productController.deleteProduct
// router.delete('/:id', productController.deleteProduct);


// 5. Exporta o router configurado
// Isso permite que o arquivo principal do servidor (server.js) importe e use estas rotas.
module.exports = router;