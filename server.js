const express = require('express');
const mysql = require('mysql');
require('dotenv').config(); // Carrega as variáveis do arquivo .env

const app = express();
const PORT = 3000;

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao MySQL');
});

app.get('/', (req, res) => {
    res.send('Olá, Easy Tattoo!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
