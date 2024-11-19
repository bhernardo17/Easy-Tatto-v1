const express = require('express');
const mongoose = require('mongoose'); // Para conexão com o MongoDB
const dotenv = require('dotenv'); // Para carregar variáveis de ambiente
const path = require('path');

dotenv.config(); // Carrega as variáveis do arquivo .env

// Cria a instância do Express
const app = express();

// Configurações
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Conexão com o MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ Conectado ao MongoDB!'))
    .catch((error) => {
        console.error('❌ Erro ao conectar ao MongoDB:', error.message);
        process.exit(1); // Finaliza o processo em caso de erro
    });

// Configurando o EJS como motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Middleware para tratar dados de formulários

// Rotas
// Página inicial
app.get('/sobre', (req, res) => {
    res.render('index'); // Renderiza o arquivo index.ejs
});

// Página de login e cadastro
app.get('/login', (req, res) => {
    res.render('login'); // Renderiza o arquivo login.ejs
});

// Página do perfil do tatuador
app.get('/perfil', (req, res) => {
    console.log("Acessando a página de perfil");
    res.render('perfil'); // Renderiza o arquivo perfil.ejs
});

// Página do perfil do usuário
app.get('/perfilUsuario', (req, res) => {
    console.log("Acessando a página de perfil do usuário");
    res.render('perfilUsuario'); // Renderiza o arquivo perfilUsuario.ejs
});

// Página de configurações
app.get('/config', (req, res) => {
    console.log("Acessando as configurações");
    res.render('configuracoes'); // Renderiza o arquivo configuracoes.ejs
});

// Página de feed
app.get('/feed', (req, res) => {
    // Exemplo de posts que podem vir do banco de dados futuramente
    const posts = [
        { imageUrl: '/img/tattoo1.jpg', artistName: 'Artista 1', description: 'Tatuagem Old School', likes: 120, comments: 45 },
        { imageUrl: '/img/tattoo2.jpg', artistName: 'Artista 2', description: 'Flashs disponíveis', likes: 98, comments: 34 },
    ];
    res.render('feed', { posts }); // Envia os posts para o arquivo feed.ejs
});

// Middleware para lidar com rotas inexistentes
app.use((req, res, next) => {
    res.status(404).send('Página não encontrada!');
});

// Middleware para tratamento de erros gerais
app.use((err, req, res, next) => {
    console.error('Erro:', err.message);
    res.status(500).send('Ocorreu um erro no servidor!');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
