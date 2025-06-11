const User = require('../models/User.js');

const userController = {
    registerUser: async (req, res, next) => { // Adicionado 'next' para passar erros
        try {
            // 1. Extrai os dados do corpo da requisição
            const { fullname, password, email, telephoneN, cep, address, addressN, date } = req.body;

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
    }
};

module.exports = userController;