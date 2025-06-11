// Arquivo: src/config/db.js

const mysql = require('mysql2');
require('dotenv').config();

// Cria um "pool" de conexões, que é mais eficiente que uma conexão única.
// O .promise() é a parte MÁGICA que faz o async/await funcionar corretamente.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Apenas um teste para ver se a conexão funcionou no início
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar com o banco de dados:', err);
        return;
    }
    console.log(`Conectado com sucesso ao banco de dados MySQL! (ID da Conexão: ${connection.threadId})`);
    connection.release(); // Libera a conexão de volta para o pool
});

// Exporta o pool com suporte a Promises
module.exports = pool.promise();