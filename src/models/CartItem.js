// src/models/CartItem.js

const db = require('../config/db.js');

class CartItem {
    constructor(id, cartId, productId, quantity) {
        this.id = id;
        this.cartId = cartId;
        this.productId = productId;
        this.quantity = quantity;
    }

    static async addItem(cartId, productId, quantity) {
        try {
            const findSql = "SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?";
            const [existingItems] = await db.execute(findSql, [cartId, productId]);

            if (existingItems.length > 0) {
                const existingItem = existingItems[0];
                const newQuantity = existingItem.quantity + quantity; // Soma a quantidade existente com a nova

                const updateSql = "UPDATE cart_items SET quantity = ? WHERE id = ?";
                await db.execute(updateSql, [newQuantity, existingItem.id]);

                console.log(`Quantidade do produto ${productId} atualizada para ${newQuantity} no carrinho ${cartId}.`);
                return { id: existingItem.id, quantity: newQuantity }; // Retorna o item atualizado
            } else {
                const createSql = "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)";
                const [result] = await db.execute(createSql, [cartId, productId, quantity]);

                console.log(`Produto ${productId} adicionado com quantidade ${quantity} ao carrinho ${cartId}.`);
                return { id: result.insertId, quantity: quantity }; // Retorna o item novo
            }

        } catch (error) {
            console.error("Erro no CartItem.addItem:", error);
            throw error; // Lança o erro para o controller que chamou este método.
        }
    }

        static async getItemsByCartId(cartId) {
        try {
            const sql = `
            SELECT
                ci.id, ci.quantity,
                p.id AS productId, p.name, p.price, p.img
            FROM cart_items AS ci
            JOIN products AS p ON ci.product_id = p.id
            WHERE ci.cart_id = ?
        `;
            const [items] = await db.execute(sql, [cartId]);
            return items;
        } catch (error) {
            throw error;
        }
    }

    // Os métodos para manipular os itens virão aqui...
}

module.exports = CartItem;