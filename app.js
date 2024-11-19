const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const userRoutes = require('./routes/userRoutes'); // Rotas para usuários

dotenv.config(); // Carrega as variáveis do arquivo .env

// Configurações principais
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/seu_banco_de_dados';

// Conexão com o MongoDB
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Conectado ao MongoDB!'))
    .catch((error) => {
        console.error('❌ Erro ao conectar ao MongoDB:', error.message);
        process.exit(1); // Encerra o servidor em caso de erro
    });

// Configurações do Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para lidar com formulários
app.use(express.static(path.join(__dirname, 'public')));


app.get('/sobre', (req, res) => {
    res.render('index'); // Renderiza a página "sobre"
});

app.get('/login', (req, res) => {
    res.render('login'); // Renderiza a página de login
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

// Rotas de API
app.use('/api/users', userRoutes); // Define o prefixo para as rotas de usuários

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
