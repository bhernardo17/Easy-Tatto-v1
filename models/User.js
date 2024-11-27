const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    tipo: { type: String, enum: ['usuario', 'tatuador'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

// Middleware para hashear a senha antes de salvar
UserSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next();
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
});

// Método para comparar senhas
UserSchema.methods.comparePassword = async function (senha) {
    return await bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model('User', UserSchema);
