// A PRIMEIRA LINHA do seu arquivo principal (ex: server.js ou app.js)
require('dotenv').config();

const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost', // O fallback pode ser 'localhost' para desenvolvimento local
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '', // Senha vazia para fallback
  database: process.env.DB_NAME || 'ecommerceusados'
});

conexao.connect((erro) => {
  if (erro) {
    console.error('Erro ao conectar ao MySQL:', erro);
    // Em um aplicativo real, você pode querer interromper a execução aqui
    // process.exit(1);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

module.exports = conexao;