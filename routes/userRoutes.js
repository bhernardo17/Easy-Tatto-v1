const express = require('express');
const User = require('../models/User'); // Modelo do usuário
const router = express.Router();

// Rota de cadastro
router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
        return res.render('login', { error: 'As senhas não coincidem.' });
    }

    try {
        // Verifica se o usuário já existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('login', { error: 'Usuário já existe.' });
        }

        // Cria um novo usuário
        const newUser = new User({ username, email, password, role });
        await newUser.save();

        // Redireciona para a página de login
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).render('login', { error: 'Erro ao cadastrar. Tente novamente.' });
    }
});

// Rota de login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verifica se o usuário existe
        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.render('login', { error: 'Usuário ou senha incorretos.' });
        }

        // Se o login for bem-sucedido, redireciona para o feed
        res.redirect('/feed');
    } catch (err) {
        console.error(err);
        res.status(500).render('login', { error: 'Erro interno. Tente novamente.' });
    }
});

module.exports = router;
