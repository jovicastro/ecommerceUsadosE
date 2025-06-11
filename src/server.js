require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importa suas rotas
const userRoutes = require('./routes/userRoutes.js');
const productRoutes = require('./routes/productRoutes.js');

const app = express();
app.use(cors());
app.use(express.json());

// Monta as rotas com os prefixos corretos
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes); // Descomente se estiver usando

// Middleware para rotas não encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint não encontrado.' });
});

// Middleware para tratamento de erros global
app.use((error, req, res, next) => {
    console.error('ERRO INESPERADO NO SERVIDOR:', error);
    res.status(500).json({ message: 'Ocorreu um erro inesperado no servidor.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});