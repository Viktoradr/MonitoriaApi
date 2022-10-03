const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

let usuarioSchema = new mongoose.Schema({
    nome: String,
    email: String,
    login: String,
    senha: String,                                               
    ativo: Boolean,
    perfil: Number,
    dataCadastro: Date
})

module.exports = mongoose.model('usuario', usuarioSchema, 'usuario')