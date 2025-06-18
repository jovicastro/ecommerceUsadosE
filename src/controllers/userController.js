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
        try{
            const {email, password} = req.body;
            console.log('dados login tst',req.body);

        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha sao obrigatorios'})
        }

        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(401).json({message: 'Email ou senha invalidos`'});
        }
        console.log("user: ",user)

        /////Senha

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

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


        console.log('login valido:', user.email);
        return res.status(200).json({
            message: "Login bem-sucedido!",
            token: token
        });


        }catch (error){
            console.error("DETALHES DO ERRO CAPTURADO NO LOGIN:", error);
            console.log("erro em userController>loginUser");
            return res.status(500).json({message: "Erro interno"})
        }

    }

}


module.exports = userController;