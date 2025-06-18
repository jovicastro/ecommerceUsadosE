//src/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    ///pega o header do cabecalho, estudar isto depois
    const token = req.cookies.token;
    console.log('Middleware: Token recebido do header:', token);

    if (!token) {
        return res.redirect('/login');
    }

    try {
        ///revisar isso depois

         console.log("3. Verificando com a chave secreta:", process.env.JWT_SECRET);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("4. Token verificado com SUCESSO. Payload:", decoded);

        req.user = decoded;

        next();

    } catch (ex) {
        console.error("5. ERRO na verificação do JWT (bloco catch):", ex.message);
        return res.redirect('/login')
    }
};