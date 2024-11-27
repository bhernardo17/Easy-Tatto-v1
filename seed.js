const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User'); // Importa o modelo de usuário

dotenv.config(); // Carrega variáveis de ambiente

// Conecta ao MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/EasyTattoDB';
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ Conectado ao MongoDB para popular dados!'))
    .catch(err => {
        console.error('❌ Erro ao conectar ao MongoDB:', err.message);
        process.exit(1);
    });

async function seedDatabase() {
    try {
        // Limpa a coleção de usuários
        await User.deleteMany({});
        console.log('🔄 Coleção de usuários limpa.');

        // Insere usuários fictícios
        const users = await User.insertMany([
            { nome: 'Alice', email: 'alice@example.com', senha: '123456', tipo: 'usuario' },
            { nome: 'Bob', email: 'bob@example.com', senha: 'senhaSegura', tipo: 'tatuador' },
        ]);

        console.log('✅ Usuários populados com sucesso:', users);
    } catch (error) {
        console.error('❌ Erro ao popular o banco:', error.message);
    } finally {
        // Fecha a conexão com o banco
        mongoose.connection.close();
        console.log('🔒 Conexão com o MongoDB encerrada.');
    }
}

// Executa o script
seedDatabase();
