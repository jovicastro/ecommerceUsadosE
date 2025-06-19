const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const User = require('../models/User.js');


// rota para logon
router.post('/register', userController.registerUser);
// rota para login
router.post('/login', userController.loginUser)
//logout
router.get('/logout', userController.logoutUser);


router.get('/me', authMiddleware, async (req, res) => {

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const { password, ...userData } = user;

        res.json({ 
            message: 'Dados do usuário autenticado.',
            user: userData 
        });

        
    } catch(error) {
        console.error("ERRO DETALHADO NA ROTA /ME:", error);
        res.status(500).json({ message: 'Erro ao buscar dados do usuário.' });
    }

});


module.exports = router;