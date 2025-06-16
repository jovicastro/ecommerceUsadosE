// src/models/Product.js

// 1. Importa a conexão com o banco de dados que configuramos em src/config/db.js
const db = require('../config/db.js');

class Product {
    // O construtor é chamado quando criamos uma nova instância de Product
    constructor(id, name, description, price, img, date, status, category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.img = img;
        this.date = date;
        this.status = status;
        this.category = category;
    }

    // 3. Método para SALVAR um novo produto no banco de dados (VERSÃO CORRIGIDA)
    async save() {
        const sql = `
            INSERT INTO products 
                (name, description, price, img, date, status, category) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            this.name,
            this.description,
            this.price,
            this.img,
            this.date,
            this.status,
            this.category
        ];

        try {
            // Executa a query com 'await'. A biblioteca 'mysql2/promise' retorna um array.
            // O primeiro elemento do array ([result]) contém as informações sobre a inserção.
            const [result] = await db.query(sql, values);
            
            // Atribuímos o ID gerado de volta ao objeto produto.
            this.id = result.insertId; 
            
            // Retorna o objeto produto atual (agora com o ID).
            return this;
        } catch (error) {
            // Se ocorrer um erro, ele será capturado pelo bloco 'catch' no controller.
            console.error('Erro ao salvar produto no banco de dados:', error);
            throw error; // Lança o erro para ser tratado no controller.
        }
    }

    // MÉTODO PARA BUSCAR TODOS OS PRODUTOS (VERSÃO CORRIGIDA)
    /**
     * @description Busca todos os produtos cadastrados no banco de dados.
     * @static
     * @async
     * @returns {Promise<Array<object>>} Uma Promessa que resolve com um array de objetos de produto.
     */
    static async findAll() {
        const sql = "SELECT * FROM products ORDER BY date DESC, id DESC";

        try {
            // Executa a query com 'await'. O resultado (os produtos) vem no primeiro elemento do array.
            // Usamos a desestruturação [rows] para pegar diretamente esse array de produtos.
            const [rows] = await db.query(sql);
            return rows;
        } catch (error) {
            // Se houver erro, ele será capturado pelo bloco 'catch' no controller.
            console.error('Erro ao buscar todos os produtos do DB:', error);
            throw error; // Lança o erro para o controller.
        }
    }
    static async findById(id) {
        try {
            const sql = "SELECT * FROM products WHERE id = ?";
            // O pool.execute já retorna uma promise!
            // [rows] pega apenas a primeira parte da resposta, que são os dados.
            const [rows] = await db.execute(sql, [id]);

            // Se encontrou algo, retorna a primeira linha. Senão, retorna null.
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error("Erro no Model ao buscar produto por ID:", error);
            // Lança o erro para que o catch do controller possa pegá-lo.
            throw error; 
        }
    }
}

module.exports = Product;
