// src/controllers/productController.js
const Product = require('../models/Product'); // Importa a classe Product

const productController = {
    // ... (outros métodos como getAllProducts, getProductById, etc. da resposta anterior) ...

    // Método para criar um novo produto (recebe requisição HTTP POST)
    createProduct: async (req, res) => {
        try {
            // Pega os dados do corpo da requisição POST (req.body)
            // Isso corresponde aos $_POST['nome'], $_POST['descricao'] do PHP
            const { name, description, price, img, data, estado, categoria } = req.body;

            // ================== VALIDAÇÃO BÁSICA ==================
            // Equivalente ao `if (empty($nome) || empty($preco))` do PHP
            if (!name || !price || !data || !estado || !categoria) {
                // Retorna um erro HTTP 400 (Bad Request) se dados essenciais estiverem faltando
                return res.status(400).json({ message: 'Nome, preço, data, estado e categoria são obrigatórios.' });
            }

            // Opcional: Validar formatos (ex: preço ser número, data ser data válida)
            if (isNaN(parseFloat(price))) {
                 return res.status(400).json({ message: 'O preço deve ser um número válido.' });
            }
            // Para data, você pode querer formatar ou validar o formato aqui
            // Ex: const parsedDate = new Date(data); if (isNaN(parsedDate.getTime())) { /* erro */ }


            // ================== CRIA INSTÂNCIA DO PRODUTO E SALVA ==================
            // Cria um novo objeto Product com os dados recebidos
            const newProduct = new Product(
                null, // ID será gerado pelo DB
                name,
                description,
                parseFloat(price), // Converte para número, importante para cálculos e DB
                img,
                data,    // Usar a string como está, ou formatar se necessário para o DB
                estado,
                categoria
            );

            // Chama o método `save()` do objeto `newProduct` para inserir no banco de dados
            // Isso é o equivalente funcional do `$conn->query($sql)` do PHP
            await newProduct.save();

            // ================== RETORNA RESPOSTA DE SUCESSO ==================
            // Equivalente ao `echo "Produto cadastrado com sucesso!"` do PHP
            // Retorna um status 201 (Created) e os dados do produto recém-criado
            res.status(201).json({ message: 'Produto cadastrado com sucesso!', product: newProduct });

        } catch (error) {
            // ================== TRATA ERROS ==================
            // Equivalente ao `else { echo "Erro: " . $sql . "<br>" . $conn->error; }` do PHP
            console.error('Erro ao cadastrar produto:', error);
            // Retorna um status 500 (Internal Server Error)
            res.status(500).json({ message: 'Erro interno do servidor ao cadastrar produto.' });
        }
    },
};

module.exports = productController;