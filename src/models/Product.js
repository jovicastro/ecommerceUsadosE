// src/models/Product.js

// 1. Importa a conexão com o banco de dados que configuramos em src/config/db.js
const db = require('../config/db.js');

class Product {
    // O construtor é chamado quando criamos uma nova instância de Product
    // Ex: const meuProduto = new Product(null, 'Notebook', 'Ótimo notebook', 1500.00, ...);
    // Os parâmetros correspondem aos dados que esperamos para um produto.
    constructor(id, name, description, price, img, date, status, category) {
        this.id = id;                   // ID do produto (será null ao criar, o BD gera)
        this.name = name;               // Nome do produto
        this.description = description; // Descrição
        this.price = price;             // Preço
        this.img = img;                 // URL ou caminho da imagem
        this.date = date;               // Data (ex: de cadastro ou do produto)
        this.status = status;           // Status do produto (ex: 'novo', 'usado', 'recondicionado')
        this.category = category;       // Categoria do produto
    }
        // 3. Método para SALVAR um novo produto no banco de dados
    // Este método será assíncrono, pois operações de banco de dados levam um tempo.
    async save() {
        // Monta a query SQL para inserir os dados na tabela 'products'.
        // ATENÇÃO: Os nomes das colunas na query (name, description, price, img, date, status, category)
        // DEVEM CORRESPONDER EXATAMENTE aos nomes das colunas na sua tabela 'products' no MySQL.
        // Se sua tabela tiver colunas como 'product_name' ou 'product_status', ajuste a query aqui.
        const sql = `
            INSERT INTO products 
                (name, description, price, img, date, status, category) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            // Cria um array com os valores do objeto 'this' (o produto atual)
        // A ORDEM dos valores aqui DEVE CORRESPONDER à ordem dos '?' na query SQL.
        const values = [
            this.name,
            this.description,
            this.price,
            this.img,
            this.date,
            this.status,
            this.category
        ];

        // O método save retorna uma Promise. Quem chamar o método (o Controller)
        // poderá usar 'await' para esperar a conclusão desta operação.
        return new Promise((resolve, reject) => {
            // Executa a query no banco de dados
            // db.query(sql_query, array_de_valores, callback_function(erro, resultado))
            db.query(sql, values, (error, result) => {
                if (error) {
                    // Se ocorrer um erro na query:
                    console.error('Erro ao salvar produto no banco de dados:', error);
                    // Rejeita a Promise com o objeto de erro.
                    return reject(error);
                }
                // Se a inserção for bem-sucedida:
                // 'result.insertId' contém o ID auto-incrementado do novo produto inserido.
                this.id = result.insertId; // Atribuímos o ID gerado de volta ao objeto produto
                // Resolve a Promise, retornando o objeto produto atual (agora com o ID).
                resolve(this);
            });
        });
    }
}

