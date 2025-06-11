// Em src/controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Assumindo que User.js exporta a classe User

// ... (seu objeto controller)
// registerUser: async (req, res) => { // Removido para focar no corpo da função
    try {
        // PONTO DE ATENÇÃO: Quais campos vêm do req.body?
        const { fullname, password, email, telephoneN, cep, addressN, admin } = req.body; // Adicionado fullname e outros campos

        // Validações de entrada (email já existe? campos obrigatórios?) - IMPORTANTE!
        // (Você precisará implementar essa lógica de validação)
        // Ex: if (!fullname || !password || !email) { return res.status(400).json({message: "Campos obrigatórios faltando"}); }
        // Ex: const existingUser = await User.findByEmail(email); if (existingUser) { return res.status(400).json({message: "Email já cadastrado"}); }


        const saltRounds = 10; // Ótimo, 10 é um bom valor!
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Ajustar o primeiro argumento para 'fullname' para corresponder ao construtor do User
        // E passar os outros campos
        const newUser = new User(
            null,            // id
            fullname,        // fullname
            hashedPassword,  // Senha já hasheada pelo controller
            email,
            telephoneN,
            cep,
            addressN,
            admin            // Considerar o valor padrão para 'admin' (ver abaixo)
        );
        const savedUser = await newUser.save(); // O método save do User agora recebe o hash

        // Retornar sucesso (talvez um token JWT também)
        res.status(201).json({ message: 'Usuário registrado!', userId: savedUser.id });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error); // Adicionado log de erro
        // Tratar erro de forma mais específica se possível
        res.status(500).json({ message: 'Erro interno ao registrar usuário.', errorDetails: error.message });
    }
// } // Fecha a função registerUser
// ...