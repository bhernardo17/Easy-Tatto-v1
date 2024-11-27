const express = require('express');
const User = require('../models/User'); // Modelo do usuário
const router = express.Router();

// Rota de cadastro
router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
        return res.render('login', { errorMessage: 'As senhas não coincidem.' });
    }

    try {
        console.log('Tentando registrar novo usuário:', { username, email, role });

        // Verifica se o usuário já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Usuário já existe com o email:', email);
            return res.render('login', { errorMessage: 'E-mail já registrado.' });
        }

        // Cria um novo usuário
        const newUser = new User({ nome: username, email, senha: password, tipo: role });
        await newUser.save();
        console.log('Usuário registrado com sucesso:', newUser);

        // Redireciona para a página de login
        res.redirect('/login');
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err);
        res.status(500).render('login', { errorMessage: 'Erro ao cadastrar. Tente novamente.' });
    }
});

router.post('/login', async (req, res) => {
    console.log('Dados recebidos:', req.body);
    
    const { email, senha } = req.body; // Use 'email' e 'senha' como no formulário

    try {
        const user = await User.findOne({ email });
        if (!user || user.senha !== senha) {
            return res.render('login', { errorMessage: 'Email ou senha incorretos.' });
        }

        req.session.user = {
            id: user._id,
            nome: user.nome,
            tipo: user.tipo
        };

        res.redirect('/sobre'); // Página de destino após login bem-sucedido
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).render('login', { errorMessage: 'Erro interno. Tente novamente.' });
    }
});


// Rota para /feed (apenas para teste)
router.get('/feed', (req, res) => {
    if (!req.session.user) {
        console.log('Acesso ao /feed negado: usuário não está logado.');
        return res.redirect('/login'); // Redireciona se não estiver logado
    }
    console.log('Acesso ao /feed permitido para:', req.session.user);
    res.render('feed', { user: req.session.user });
});

module.exports = router;
