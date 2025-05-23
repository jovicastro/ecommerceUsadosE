const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'db',          // Nome do serviço no Docker
  user: 'root',        // Usuário
  password: 'root',    // Senha
  database: 'ecommerceusados'
});
conexao.connect((erro) => {
  if (erro) {
    console.error('Erro ao conectar ao MySQL:', erro);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

module.exports = conexao;

