const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    ///pega o header do cabecalho, estudar isto depois
    const token = req.header('authorization');
    console.log('Middleware: Token recebido do header:', token);

    if (!token) {
        return res.status(401).json({message:'Pa! Acesso negado. token nao fornecido'})
    }

    try {
        ///revisar isso depois
        const tokenValue = token.split(' ')[1];
        console.log("2. Token extraído (sem 'Bearer'):", tokenValue);
         console.log("3. Verificando com a chave secreta:", process.env.JWT_SECRET);

        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        console.log("4. Token verificado com SUCESSO. Payload:", decoded);

        req.user = decoded;

        next();

    } catch (ex) {
        console.error("5. ERRO na verificação do JWT (bloco catch):", ex.message);
        return res.status(400).json({ message: 'Token inválido.' });
    }
};