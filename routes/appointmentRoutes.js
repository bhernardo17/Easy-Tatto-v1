const express = require('express');
const Appointment = require('../models/Appointment'); // Modelo de agendamento
const router = express.Router();

// Criar agendamento
router.post('/', async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json(appointment); // Retorna o agendamento criado
    } catch (err) {
        res.status(400).json({ message: err.message }); // Retorna erro se falhar
    }
});

// Buscar todos os agendamentos
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('userId', 'nomeUsuario')  // Preenche a referência de usuário
            .populate('tattooId', 'nomeTatuagem'); // Preenche a referência de tatuagem
        res.json(appointments); // Retorna todos os agendamentos
    } catch (err) {
        res.status(500).json({ message: err.message }); // Retorna erro se falhar
    }
});

// Buscar agendamento por ID
router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('userId', 'nomeUsuario')  // Preenche a referência de usuário
            .populate('tattooId', 'nomeTatuagem'); // Preenche a referência de tatuagem
        if (appointment) {
            res.json(appointment); // Retorna o agendamento encontrado
        } else {
            res.status(404).json({ message: 'Agendamento não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message }); // Retorna erro se falhar
    }
});

// Atualizar agendamento
router.put('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (appointment) {
            res.json(appointment); // Retorna o agendamento atualizado
        } else {
            res.status(404).json({ message: 'Agendamento não encontrado' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message }); // Retorna erro se falhar
    }
});

// Deletar agendamento
router.delete('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (appointment) {
            res.status(204).send(); // Retorna sucesso, mas sem conteúdo
        } else {
            res.status(404).json({ message: 'Agendamento não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message }); // Retorna erro se falhar
    }
});

module.exports = router;
