// src/controllers/cartController.js

// Importamos nossos "especialistas" em carrinho
const Cart = require('../models/Cart.js');
const CartItem = require('../models/CartItem.js');

const cartController = {
    addItemToCart: async (req, res, next) => {
        try {

            const { productId, quantity } = req.body;

            if (!req.user || !req.user.id) {
                return res.status(401).json({ message: 'Usuário não autenticado.' });
            }

            const userId = req.user.id;

            const cart = await Cart.findOrCreateByUserId(userId);

            const cartItem = await CartItem.addItem(cart.id, productId, quantity);

            res.status(200).json({
                message: "Produto adicionado/atualizado no carrinho com sucesso!",
                item: cartItem
            });

        } catch (error) {
            console.error("Erro no cartController.addItemToCart:", error);
            next(error); // Passa o erro para o middleware de erro global
        }
        
    },
    getCart: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const cart = await Cart.findOrCreateByUserId(userId);
            const items = await CartItem.getItemsByCartId(cart.id);
            res.status(200).json(items);
        } catch (error) {
            next(error);
        }
    }
    
};

module.exports = cartController;