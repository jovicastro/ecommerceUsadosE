// src/config/db.js

// Importa a biblioteca mysql2
const mysql = require('mysql2');

// Importa a biblioteca dotenv para carregar variáveis de ambiente do arquivo .env
// Isso garante que process.env tenha os valores definidos no seu .env
require('dotenv').config({ path: '../../.env' }); // Ajuste o caminho se o .env não estiver duas pastas acima

// Cria o objeto de conexão com o banco de dados
const connection = mysql.createConnection({
  host: process.env.DB_HOST,         // Ex: localhost ou o nome do serviço Docker
  user: process.env.DB_USER,         // Ex: root
  password: process.env.DB_PASSWORD, // Sua senha do MySQL
  database: process.env.DB_NAME      // Ex: ecommerceusados
});

// Tenta estabelecer a conexão com o MySQL
connection.connect((error) => {
  if (error) {
      // Se houver um erro ao conectar, exibe o erro no console
      console.error('Erro ao conectar ao banco de dados MySQL:', error.stack);
      // Em uma aplicação real, você pode querer tratar este erro de forma mais robusta,
      // como tentar reconectar algumas vezes ou encerrar a aplicação se a conexão for vital.
      return;
  }
  // Se a conexão for bem-sucedida, exibe uma mensagem no console
  console.log(`Conectado com sucesso ao banco de dados MySQL! (ID da Conexão: ${connection.threadId})`);
});

// Exporta o objeto de conexão para que ele possa ser usado em outras partes do seu backend
// (principalmente nos seus Models para fazer queries no banco)
module.exports = connection;