const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Carregar variáveis do .env
dotenv.config();

// URL do MongoDB no arquivo .env
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Conectado ao MongoDB com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao conectar ao MongoDB:', error.message);
        process.exit(1); // Finaliza o processo em caso de erro
    }
};

module.exports = connectDB;
