const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Modelo de usuário

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/EasyTattoDB';

// Conexão com o MongoDB
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Conectado ao MongoDB!'))
    .catch((error) => {
        console.error('❌ Erro ao conectar ao MongoDB:', error.message);
        process.exit(1);
    });

// Configurações do Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal para login/cadastro
app.get('/login', (req, res) => {
    res.render('login', { errorMessage: null });
});

// Rota de login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ email: username }); // Buscar pelo email
        if (user && (await bcrypt.compare(password, user.senha))) { // Verificação de senha
            console.log(`✅ Login bem-sucedido: ${user.email}`);
            res.redirect(''); // Redireciona para o feed
        } else {
            res.status(401).render('login', { errorMessage: 'Usuário ou senha incorretos.' });
        }
    } catch (err) {
        console.error('Erro no login:', err.message);
        res.status(500).render('login', { errorMessage: 'Erro interno no servidor.' });
    }
});

// Rota de cadastro
app.post('/cadastro', async (req, res) => {
    const { username, email, password, confirmPassword, role } = req.body;

    // Verificação se as senhas coincidem
    if (!confirmPassword || password !== confirmPassword) {
        console.error('Erro: As senhas não coincidem');
        return res.status(400).render('login', { errorMessage: 'As senhas não coincidem.' });
    }

    try {
        // Verifica se o e-mail já está registrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.error('Erro: E-mail já registrado');
            return res.status(400).render('login', { errorMessage: 'E-mail já registrado.' });
        }

        // Criação do novo usuário
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            nome: username,
            email,
            senha: hashedPassword,
            tipo: role,
        });

        await newUser.save();
        console.log('✅ Usuário cadastrado:', newUser.email);
        res.redirect('/login'); // Redireciona para a tela de login
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err.message);
        res.status(500).render('login', { errorMessage: 'Erro interno no servidor.' });
    }
});


// Outros endpoints...

app.get('/sobre', (req, res) => {
    res.render('index'); // Renderiza a página "sobre"
});


app.get('/perfil', (req, res) => {
    console.log("Acessando a página de perfil do tatuador");
    res.render('perfil');
});

app.get('/perfilUsuario', (req, res) => {
    console.log("Acessando a página de perfil do usuário");
    res.render('perfilUsuario');
});

app.get('/config', (req, res) => {
    console.log("Acessando as configurações");
    res.render('configuracoes');
});

app.get('/feed', (req, res) => {
    const posts = [
        { imageUrl: '/img/tattoo1.jpg', artistName: 'Artista 1', description: 'Tatuagem Old School', likes: 120, comments: 45 },
        { imageUrl: '/img/tattoo2.jpg', artistName: 'Artista 2', description: 'Flashs disponíveis', likes: 98, comments: 34 },
    ];
    res.render('feed', { posts }); // Envia os posts para a página feed
});

// Middleware para rotas inexistentes
app.use((req, res) => {
    res.status(404).render('404', { message: 'Página não encontrada!' });
});

// Middleware para erros gerais
app.use((err, req, res, next) => {
    console.error('Erro:', err.message);
    res.status(500).render('500', { message: 'Erro interno no servidor!' });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
