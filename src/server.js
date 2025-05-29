// src/server.js

// 1. Carrega as variáveis de ambiente do arquivo .env
// É uma boa prática fazer isso no início do seu arquivo de entrada principal.
// Se o .env está na raiz do projeto, o dotenv().config() sem path o encontrará
// quando você rodar 'node src/server.js' a partir da raiz do projeto.
require('dotenv').config();

// 2. Importa as dependências necessárias
const express = require('express'); // Framework web principal
const cors = require('cors');       // Para habilitar Cross-Origin Resource Sharing

// 3. Importa nossas rotas de produto
const productRoutes = require('./routes/productRoutes.js');

// Importa a configuração do banco de dados.
// Embora não usemos a variável 'db' diretamente aqui, importar este arquivo
// garante que o código de conexão em 'db.js' seja executado e a conexão estabelecida.
const db = require('./config/db.js'); // Guardamos a referência caso precisemos no futuro

// 4. Cria uma instância da aplicação Express
const app = express();

// 5. Configura os Middlewares Globais
// Middleware CORS: Habilita o CORS para todas as rotas.
// Isso permite que seu frontend faça requisições para este backend.
app.use(cors());

// Middleware para o Express entender JSON:
// Transforma o corpo (body) das requisições que são do tipo 'application/json'
// em um objeto JavaScript acessível através de 'req.body'.
app.use(express.json());

// Middleware para o Express entender dados de formulário URL-encoded (opcional):
// Se seu frontend enviar dados no formato 'application/x-www-form-urlencoded',
// este middleware é necessário. Se você só usa JSON, ele é opcional.
// app.use(express.urlencoded({ extended: true }));


// 6. Define e Monta as Rotas da API
// Dizemos ao Express que qualquer requisição que comece com o caminho '/api/products'
// deve ser gerenciada pelo nosso 'productRoutes' (que importamos acima).
app.use('/api/products', productRoutes);

// Exemplo de uma rota raiz para a API (opcional, para teste)
app.get('/api', (req, res) => {
    res.json({ message: 'Bem-vindo à API do E-commerce de Usados! O backend está no ar!' });
});

// Middleware para tratar rotas não encontradas (404) - Boa prática
app.use((req, res, next) => {
    res.status(404).json({ message: 'Desculpe, o endpoint que você procura não foi encontrado.' });
});

// Middleware para tratamento de erros global - Boa prática
// Se qualquer rota chamar 'next(error)', este middleware será acionado.
app.use((error, req, res, next) => {
    console.error('ERRO INESPERADO NO SERVIDOR:', error.stack);
    res.status(500).json({ message: 'Ocorreu um erro inesperado no servidor. Tente novamente mais tarde.' });
});


// 7. Define a Porta e Inicia o Servidor
// Pega a porta da variável de ambiente PORT (definida no .env) ou usa 3000 como padrão.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    // Esta mensagem aparecerá no console do backend quando o servidor iniciar com sucesso.
    console.log(`Servidor Node.js está rodando e escutando na porta ${PORT}`);
    console.log(`Acesse a API em: http://localhost:${PORT}/api`);
    console.log(`Para cadastrar produtos, seu frontend deve enviar um POST para: http://localhost:${PORT}/api/products`);
    // A mensagem de conexão com o BD virá do db.js
});