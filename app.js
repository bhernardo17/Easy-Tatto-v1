const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

// Configurando a porta
const PORT = process.env.PORT || 3000;

// Configurando o EJS como motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Middleware para tratar dados do formulário

// Rota para a página inicial (index.ejs)
app.get('/sobre', (req, res) => {
    res.render('index'); // Renderiza o arquivo index.ejs
});

// Rota para a página de login e cadastro (login.ejs)
app.get('/login', (req, res) => {
    res.render('login'); // Renderiza o arquivo login.ejs
});

// Rota para o perfil do tatuador (perfil.ejs)
app.get('/perfil', (req, res) => {
    console.log("Acessando a página de perfil");
    res.render('perfil'); // Renderiza o arquivo perfil.ejs
});

// Rota para o perfil do usuário comum (perfilUsuario.ejs)
app.get('/perfilUsuario', (req, res) => {
    console.log("Acessando a página de perfil do usuário");
    res.render('perfilUsuario'); // Renderiza o arquivo perfilUsuario.ejs
});

// Rota para o perfil do usuário comum (perfilUsuario.ejs)
app.get('/config', (req, res) => {
    console.log("Acessando as configurações");
    res.render('configuracoes'); // Renderiza o arquivo perfilUsuario.ejs
});

app.get('/feed', (req, res) => {
    const posts = [
        { imageUrl: '/img/tattoo1.jpg', artistName: 'Artista 1', description: 'Tatuagem Old School', likes: 120, comments: 45 },
        { imageUrl: '/img/tattoo2.jpg', artistName: 'Artista 2', description: 'Flashs disponiveis', likes: 98, comments: 34 },
        // mais posts...
    ];
    res.render('feed', { posts });
});

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
