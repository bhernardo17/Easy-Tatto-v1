const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const tattooRoutes = require('./routes/tattooRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes'); // Importa as rotas de agendamentos

const app = express();

// Conexão com o banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/seu_banco_de_dados', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware para permitir o parsing do corpo da requisição como JSON
app.use(express.json());

// Usando as rotas
app.use('/api/users', userRoutes);
app.use('/api/tattoos', tattooRoutes);
app.use('/api/appointments', appointmentRoutes); // Adiciona as rotas de agendamentos

// Porta do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
