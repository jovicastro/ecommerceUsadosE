// src/config/db.js (VERSÃO NOVA E MELHORADA)

const mysql = require('mysql2/promise'); // <<< IMPORTANTE: adicione '/promise'
require('dotenv').config();

console.log('--- Configurando Pool de Conexões com o Banco ---');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('-------------------------------------------');

// 1. Mude de createConnection para createPool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true, // Espera por uma conexão se todas estiverem em uso
    connectionLimit: 10,      // Número máximo de conexões no pool
    queueLimit: 0             // Fila de espera ilimitada
});

// 2. Não precisamos mais do pool.connect(). O pool gerencia isso automaticamente.

// 3. Exportamos o pool.
module.exports = pool;








// // Arquivo: src/config/db.js

// const mysql = require('mysql2');
// require('dotenv').config();

// // Cria um "pool" de conexões, que é mais eficiente que uma conexão única.
// // O .promise() é a parte MÁGICA que faz o async/await funcionar corretamente.
// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// // Apenas um teste para ver se a conexão funcionou no início
// pool.getConnection((err, connection) => {
//     if (err) {
//         console.error('Erro ao conectar com o banco de dados:', err);
//         return;
//     }
//     console.log(`Conectado com sucesso ao banco de dados MySQL! (ID da Conexão: ${connection.threadId})`);
//     connection.release(); // Libera a conexão de volta para o pool
// });

// // Exporta o pool com suporte a Promises
// module.exports = pool.promise();