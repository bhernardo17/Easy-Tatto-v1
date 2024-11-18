const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tattooId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tattoo', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['pendente', 'concluído'], default: 'pendente' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
