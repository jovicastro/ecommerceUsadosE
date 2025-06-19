const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');


const userController = {
//////////////////////Registro de usuario
    registerUser: async (req, res, next) => { // Adicionado 'next' para passar erros
        try {
            // 1. Extrai os dados do corpo da requisição
            const { fullname, password, email, telephoneN, cep, address, addressN, date } = req.body;

            console.log('Dados recebidos no backend:', req.body);

            // 2. Cria o objeto User com os argumentos na ORDEM CORRETA
            const newUser = new User(
                null, fullname, password, email, telephoneN, cep, address, addressN, false, date
            );

            // 3. Salva o usuário no banco de dados
            const savedUser = await newUser.save();

            // 4. Retorna uma resposta de sucesso
            res.status(201).json({
                message: 'Usuário cadastrado com sucesso!',
                user: { id: savedUser.id, fullname: savedUser.fullname }
            });

        } catch (error) {
            // Passa o erro para o middleware de tratamento de erros global
            next(error);
        }
    },
//////////////////////Login de usuario
    ///////Email
    loginUser: async (req, res) => {
        console.log("\n--- TENTATIVA DE LOGIN RECEBIDA ---");
        try{
            const {email, password} = req.body;
            console.log('dados login:',req.body);

        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha sao obrigatorios'})
        }

        const user = await User.findByEmail(email);
        console.log("2. USUÁRIO ENCONTRADO NO BANCO:", user ? user.email : null);

        if (!user) {
            return res.status(401).json({message: 'Email ou senha invalidos`'});
        }
        console.log("user: ",user)

        /////Senha

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log("3. SENHA CORRETA?", isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(401).json({message: 'email ou senha invalidos'});
        }
        /////Token

        const payload = {
            id: user.id,
            fullname: user.fullname,
            email: user.email
        };
        console.log('CHAVE SECRETA SENDO USADA PELO JWT:', process.env.JWT_SECRET)

        
        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '8h' }
        );
        console.log("4. TOKEN GERADO COM SUCESSO");
        console.log("5. DEFININDO COOKIE E ENVIANDO RESPOSTA...");


        console.log('login valido:', user.email);
        res.cookie('token', token, {
            httpOnly: true, // Protege o cookie contra ataques XSS. Ele não pode ser acessado por JavaScript no frontend.
            secure: false,  // Em um site de produção com HTTPS, mude para 'true'.
            maxAge: 8 * 60 * 60 * 1000, // Tempo de vida do cookie em milissegundos (8 horas, para combinar com o token)
            sameSite: 'strict' // Proteção extra contra ataques CSRF
        });
        
        // 2. Envia uma resposta de sucesso para o frontend.
        // Em vez de enviar o token, podemos enviar uma mensagem e uma instrução de redirecionamento.
        return res.status(200).json({ 
            message: "Login bem-sucedido!",
            redirectUrl: "/" // Informa ao frontend para onde o usuário deve ir agora.
        });


        }catch (error){
            console.error("DETALHES DO ERRO CAPTURADO NO LOGIN:", error);
            console.log("erro em userController>loginUser");
            return res.status(500).json({message: "Erro interno"})
        }

    },
    logoutUser: async (req, res) => {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout bem-sucedido.' });
    }
}


module.exports = userController;