// src/models/Cart.js

const db = require('../config/db.js'); // Importa o pool de conexões

class Cart {
    constructor(id, userId) {
        this.id = id;
        this.userId = userId;
    }

    static async findById(id) {
        try {
            const sql = 'SELECT * FROM carts WHERE id = ?';
            const [rows] = await db.execute(sql, [id]);

            if (rows.length === 0) {
                return null;
            }

            const cartData = rows[0];

            return new Cart(
                cartData.id,
                cartData.user_id,
            );
        } catch (error) {
            console.error("Erro ao buscar cart por ID no modelo:", error);
            throw error;
        }
    }
    static async findOrCreateByUserId(userId) {
        console.log(`MODELO Cart: Procurando ou criando carrinho para o usuário ID: ${userId}`);
        try {
            const findSql = "SELECT * FROM carts WHERE user_id = ?";
            const [rows] = await db.execute(findSql, [userId]);

            if (rows.length > 0) {
                console.log(`Carrinho encontrado. ID: ${rows[0].id}`);
                return rows[0];
            } else {
                console.log(`Nenhum carrinho encontrado para o usuário ${userId}. Criando um novo...`);
                const createSql = "INSERT INTO carts (user_id) VALUES (?)";
                const [result] = await db.execute(createSql, [userId]);

                const newCartId = result.insertId;
                console.log(`Novo carrinho criado com ID: ${newCartId}`);
                return { id: newCartId, user_id: userId };
            }
        } catch (error) {
            console.error("Erro em Cart.findOrCreateByUserId:", error);
            throw error;
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
}

module.exports = Cart;