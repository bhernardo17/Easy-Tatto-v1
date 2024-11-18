const express = require('express');
const Tattoo = require('../models/Tattoo'); // Supondo que você tenha o modelo de Tattoo

const router = express.Router();

// Criar tatuagem
router.post('/', async (req, res) => {
    try {
        const tattoo = new Tattoo(req.body);
        await tattoo.save();
        res.status(201).json(tattoo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Buscar todas as tatuagens
router.get('/', async (req, res) => {
    try {
        const tattoos = await Tattoo.find();
        res.json(tattoos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
