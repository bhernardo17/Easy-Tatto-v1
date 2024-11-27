// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota de login
router.post('/login', authController.login);

// Rota de cadastro
router.post('/cadastro', authController.register);

module.exports = router;
