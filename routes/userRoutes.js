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

// Rota de login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    console.log('Dados recebidos para login:', { email, senha });

    try {
        // Verifica se o usuário existe no banco
        const user = await User.findOne({ email });

        if (!user) {
            console.log('Usuário não encontrado com o email:', email);
            return res.render('login', { error: 'Email ou senha incorretos.' });
        }

        if (user.senha !== senha) {
            console.log('Senha incorreta para o email:', email);
            return res.render('login', { error: 'Email ou senha incorretos.' });
        }

        console.log('Usuário logado com sucesso:', { id: user._id, nome: user.nome, tipo: user.tipo });

        // Salva o usuário na sessão (simples)
        req.session.user = {
            id: user._id,
            nome: user.nome,
            tipo: user.tipo,
        };

        // Redireciona para a página /feed
        res.redirect('/feed');
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).render('login', { error: 'Erro interno. Tente novamente mais tarde.' });
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
