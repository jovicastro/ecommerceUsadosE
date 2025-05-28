// src/server.js

// 1. Importar as dependências necessárias
require('dotenv').config(); // Carrega variáveis de ambiente do .env (DEVE SER UMA DAS PRIMEIRAS LINHAS)

const express = require('express'); // Framework para criar o servidor e as rotas
const cors = require('cors');       // Middleware para habilitar o CORS (Cross-Origin Resource Sharing)

// Importa as rotas de produto que definimos (você criará este arquivo também)
const productRoutes = require('./routes/productRoutes.js');

// Importa a conexão com o banco de dados para garantir que ela é inicializada.
// Embora não usemos 'db' diretamente aqui, importar garante que o connection.connect() em db.js seja chamado.
require('./config/db.js'); // Isso executa o código em config/db.js, tentando conectar ao banco.

// 2. Criar a aplicação Express
const app = express();

// 3. Configurar Middlewares
// Middleware CORS: Permite que requisições de diferentes origens (ex: seu frontend em localhost:outra_porta)
// acessem sua API. Para desenvolvimento, uma configuração simples é suficiente.
app.use(cors());

// Middleware para parsear o corpo das requisições JSON
// Quando o frontend envia dados JSON (como no nosso fetch),
// este middleware transforma esses dados em um objeto JavaScript acessível via req.body.
app.use(express.json());

// Middleware para parsear dados de formulários URL-encoded (opcional se você só usa JSON)
// Se seu frontend enviar dados como 'application/x-www-form-urlencoded', descomente a linha abaixo.
// app.use(express.urlencoded({ extended: true }));

// 4. Definir as Rotas da API
// Aqui, dizemos ao Express para usar o 'productRoutes' para qualquer requisição
// que comece com '/api/products'.
// Ex: Uma requisição POST para '/api/products/' será tratada por 'productRoutes'.
app.use('/api/products', productRoutes);

// Rota de "boas-vindas" ou "health check" para a raiz da API (opcional)
app.get('/api', (req, res) => {
    res.json({ message: 'Bem-vindo à API do E-commerce de Usados!' });
});

// Middleware para tratar rotas não encontradas (404) - Opcional, mas bom para feedback
app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint não encontrado.' });
});

// Middleware para tratamento de erros global - Opcional, mas bom para capturar erros inesperados
app.use((error, req, res, next) => {
    console.error('Erro global no servidor:', error);
    res.status(500).json({ message: 'Ocorreu um erro inesperado no servidor.' });
});

// 5. Definir a Porta e Iniciar o Servidor
// Pega a porta da variável de ambiente PORT (definida no .env) ou usa 3000 como padrão.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor Node.js rodando na porta ${PORT}`);
    console.log(`API disponível em http://localhost:${PORT}/api`);
    console.log(`Para cadastrar produtos, envie POST para http://localhost:${PORT}/api/products`);
});