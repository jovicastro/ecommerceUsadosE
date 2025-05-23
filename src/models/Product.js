// src/models/Product.js
const db = require('../config/db.js'); // Importa a conexão com o banco de dados

class Product {
    // Adicione os novos campos ao construtor
    constructor(id, name, description, price, imageUrl, date, state, category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.date = date;     // Novo campo (data de cadastro/publicação)
        this.state = state;   // Novo campo (estado do produto)
        this.category = category; // Novo campo (categoria)
    }

    // Método para adicionar um novo produto
    async save() {
        const sql = `INSERT INTO products
                     (name, description, price, img, date, state, category)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            this.name,
            this.description,
            this.price,
            this.imageUrl,
            this.date,
            this.state,
            this.category
        ];

        // Retorna uma Promise para lidar com a assincronicidade da consulta ao DB
        return new Promise((resolve, reject) => {
            // db.query é o método da sua conexão mysql2
            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error('Erro ao inserir produto no DB:', err);
                    return reject(err);
                }
                this.id = result.insertId; // ID gerado automaticamente pelo MySQL
                resolve(this); // Retorna a instância do produto com o ID preenchido
            });
        });
    }

    // --- Outros métodos como getAll(), getById(), update(), delete() viriam aqui ---
    // (Consulte a resposta anterior para esses exemplos)

    static async getAll() { /* ... */ }
    static async getById(id) { /* ... */ }
    async update() { /* ... */ }
    static async delete(id) { /* ... */ }
}

module.exports = Product; // Exporta a classe Product