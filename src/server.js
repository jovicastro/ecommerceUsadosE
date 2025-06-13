// Importações necessárias
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // Módulo para trabalhar com caminhos de arquivos
const ejs = require('ejs');   // Módulo para o template engine

// Importa suas rotas de API
const userRoutes = require('./routes/userRoutes.js');
const productRoutes = require('./routes/productRoutes.js');

const app = express();

// --- Middlewares Globais ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- CONFIGURAÇÃO DO FRONTEND ---

// 1. Define a pasta 'www' como o local para servir arquivos estáticos (CSS, JS, imagens)
//    Qualquer arquivo dentro de 'www' pode ser acessado diretamente pelo navegador.
app.use(express.static(path.join(__dirname, '..', 'www')));

// 2. Configura o EJS como o motor de renderização de páginas
app.set('view engine', 'ejs');
//    Define que os arquivos de template (.ejs) estão na pasta 'www'
app.set('views', path.join(__dirname, '..', 'www'));


// --- ROTAS PARA RENDERIZAR PÁGINAS ---
// Estas rotas dizem ao servidor para construir e enviar uma página HTML

app.get('/', (req, res) => {
    // Renderiza o arquivo `www/index.ejs`
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/category', (req, res) => {
    res.render('category');
});

app.get('/logon', (req, res) => {
    res.render('logon');
});

app.get('/cart', (req, res) => {
    res.render('cart');
});

app.get('/prodRegister', (req, res) => {
    res.render('prodRegister');
});

// Exemplo na sua rota do Express
app.get('/payment', (req, res) => {
    const mockUser = {
        name: 'João da Silva',
        address: {
            street: 'Rua das Flores',
            number: '123',
            city: 'São Paulo',
            state: 'SP',
            zip: '01234-567'
        }
    };

    const mockCart = {
        items: [
            { name: 'Cadeira Gamer Usada', quantity: 1, price: 350.00, imageUrl: '/img/cadeira.jpg' },
            { name: 'Projetor BenQ', quantity: 1, price: 800.00, imageUrl: '/img/projetor.jpg' }
        ],
        subtotal: 1150.00,
        shipping: 25.90,
        total: 1175.90
    };

    res.render('payment', { user: mockUser, cart: mockCart });
});

app.get('/viewProduct', (req, res) => {
    res.render('viewProduct');
});


// --- ROTAS DA API ---
// Estas rotas lidam com dados (JSON) e não mudam.
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);


// --- MIDDLEWARE DE ERROS ---
// Deve vir depois de todas as outras rotas.

// Middleware para rotas não encontradas (404)
app.use((req, res, next) => {
    res.status(404).render('404'); // Renderiza uma página 404.ejs, se você criar uma
});

// Middleware para tratamento de erros global
app.use((error, req, res, next) => {
    console.error('ERRO INESPERADO NO SERVIDOR:', error);
    res.status(500).json({ message: 'Ocorreu um erro inesperado no servidor.' });
});

// --- INICIALIZAÇÃO DO SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
