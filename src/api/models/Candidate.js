const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    nome: { type: String, unique: false, required: true },
    cargo: { type: String, unique: false, required: true },
    dataNasc: { type: String, unique: false, required: true },
    estadoCivil: { type: String, unique: false, required: true },
    genero: { type: String, unique: false, required: true },
    cep: { type: String, unique: false, required: true },
    endereco: { type: String, unique: false, required: true },
    numero: { type: String, unique: false, required: true },
    bairro: { type: String, unique: false, required: true },
    cidade: { type: String, unique: false, required: true },
    estado: { type: String, unique: false, required: true },
    email: { type: String, unique: true, required: true },
    celular: { type: String, unique: true, required: true },
    tel1: { type: String, unique: false, required: false },
    tel2: { type: String, unique: false, required: false },
    identidade: { type: Number, unique: true, required: true },
    cpf: { type: String, unique: true, required: true },
    habilitacao: { type: String, unique: false, required: true },
    carro: { type: String, unique: false, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Candidate', CandidateSchema);