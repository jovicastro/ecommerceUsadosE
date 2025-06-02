// src/controllers/productController.js

// 1. Importa o modelo Product que criamos anteriormente
const Product = require('../models/Product.js');

// 2. Cria um objeto para agrupar todas as funções do nosso controlador de produtos
const productController = {

    // Função para CRIAR um novo produto (será chamada por uma rota POST)
    // Usamos 'async' porque a operação de salvar no banco (via Product.save()) é assíncrona.
    createProduct: async (req, res) => {
        try {
            // 3. Extrai os dados do produto do corpo da requisição (req.body).
            // O frontend enviará um objeto JSON com estes campos.
            // Os nomes aqui (name, description, etc.) DEVEM CORRESPONDER
            // aos nomes que o seu frontend está enviando.
            const { name, description, price, img, date, status, category } = req.body;

            // 4. Validação básica dos dados recebidos.
            // Verifique se os campos obrigatórios foram enviados.
            // O preço pode ser 0, então verificamos se 'price' é undefined ou null.
            if (!name || price == null || !date || !status || !category) {
                // Se algum campo obrigatório estiver faltando, retorna um erro HTTP 400 (Bad Request)
                // com uma mensagem em JSON.
                return res.status(400).json({
                    message: 'Campos obrigatórios estão faltando: name, price, date, status, category.'
                });
            }

            // Você pode (e deve) adicionar mais validações aqui, por exemplo:
            // - Verificar se 'price' é um número válido.
            // - Validar o formato da 'date' (ex: YYYY-MM-DD).
            // - Verificar o tipo ou tamanho máximo dos campos.
            if (isNaN(parseFloat(price))) {
                 return res.status(400).json({ message: 'O preço deve ser um número válido.' });
            }
            // Exemplo simples de validação de data (formato YYYY-MM-DD)
            if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
                return res.status(400).json({ message: 'Formato de data inválido. Use YYYY-MM-DD.' });
            }

            // 5. Cria uma nova instância (um novo objeto) da classe Product
            // Passamos os dados validados para o construtor do Product.
            // O ID é 'null' porque o banco de dados irá gerá-lo automaticamente (AUTO_INCREMENT).
            const newProduct = new Product(
                null, // id (será gerado pelo banco)
                name,
                description,
                parseFloat(price), // Garante que o preço seja um número
                img,
                date,
                status,
                category
            );

            // 6. Salva o novo produto no banco de dados
            // Chamamos o método 'save()' que definimos no modelo Product.
            // Usamos 'await' porque 'save()' retorna uma Promise e queremos esperar
            // que a operação de salvamento seja concluída antes de continuar.
            const savedProduct = await newProduct.save(); // 'savedProduct' conterá o produto com o ID preenchido

            // 7. Envia uma resposta de sucesso de volta ao cliente (frontend)
            // HTTP status 201 significa "Created" (Criado com sucesso).
            // Enviamos uma mensagem e os dados do produto que foi salvo (incluindo o ID).
            res.status(201).json({
                message: 'Produto cadastrado com sucesso!',
                product: savedProduct // Envia o produto salvo (com ID) de volta
            });

        } catch (error) {
            // 8. Se qualquer erro ocorrer no bloco 'try' (ex: erro na validação,
            // erro ao salvar no banco, etc.), este bloco 'catch' será executado.
            console.error('Erro no controller ao criar produto:', error);

            // Envia uma resposta de erro HTTP 500 (Internal Server Error)
            // com uma mensagem genérica. Em um app de produção, você pode querer
            // tratar diferentes tipos de erros de formas diferentes.
            res.status(500).json({
                message: 'Erro interno do servidor ao tentar cadastrar o produto.',
                errorDetails: error.message // Opcional: pode enviar detalhes do erro em desenvolvimento
            });
            
        }
        
    },
        // --- NOVA FUNÇÃO PARA LISTAR TODOS OS PRODUTOS ---
    /**
     * @description Lida com a requisição GET para buscar e retornar todos os produtos.
     * @param {object} req - Objeto da requisição Express.
     * @param {object} res - Objeto da resposta Express.
     */
     getAllProducts: async (req, res) => {
        try {
            // Chama o método estático findAll() do modelo Product para buscar os produtos.
            const products = await Product.findAll();

            // Envia uma resposta HTTP 200 (OK) com a lista de produtos em formato JSON.
            // Se 'products' for um array vazio (nenhum produto encontrado), ele enviará '[]'.
            res.status(200).json(products);
        } catch (error) {
            // Se ocorrer um erro durante a busca no banco de dados:
            console.error('Erro no controller ao buscar todos os produtos:', error);
            // Envia uma resposta HTTP 500 (Internal Server Error) com uma mensagem de erro.
            res.status(500).json({
                message: 'Erro interno do servidor ao tentar buscar os produtos.',
                errorDetails: error.message // Opcional: mais detalhes do erro em desenvolvimento
            });
        }
    }
    // --- FIM DA NOVA FUNÇÃO ---

    // --- Futuros Métodos do Controlador ---
    // Aqui você poderá adicionar outras funções para:
    // - Listar todos os produtos (getAllProducts)
    // - Buscar um produto por ID (getProductById)
    // - Atualizar um produto (updateProduct)
    // - Deletar um produto (deleteProduct)
    //
    // Exemplo (estrutura básica):
    // getAllProducts: async (req, res) => {
    //     try {
    //         const products = await Product.findAll(); // Supondo que você crie Product.findAll()
    //         res.status(200).json(products);
    //     } catch (error) {
    //         console.error('Erro ao buscar produtos:', error);
    //         res.status(500).json({ message: 'Erro ao buscar produtos.' });
    //     }
    // },
};

// 3. Exporta o objeto productController para que ele possa ser usado nas nossas rotas
module.exports = productController;