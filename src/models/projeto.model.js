const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

let PermissoesSchema = new mongoose.Schema({
    flgEditar: Boolean,
    flgRemover: Boolean,
    flgVisualizar: Boolean
}, { _id: false });

let UsuarioProjetoSchema = new mongoose.Schema({
    usuarioId: ObjectId,
    nome: String,
    perfil: Number,
    permissoes: PermissoesSchema
}, { _id: false });

let CardProjetoSchema = new mongoose.Schema({ 
    cardId: ObjectId,
    descricao: String,
    titulo: String,
    subTitulo: String,
    tipoId: ObjectId,
    tipo: Number,
    mapper: [
        [String]
    ],
    endpoint: {
        producao: String,
        homologacao: String,
        ativo: Boolean
    },
    config: {
        width: String,
        height: String,
        eixoX: String,
        eixoY: String,
        size: Number,
        order: Number,
        font: String,
        color: String,
        labels: [String]
    }
}, { _id: false });

let projetoSchema = new mongoose.Schema({
    nome: String,
    categoria: String,
    descricao: String,
    ativo: Boolean,
    dataCadastro: Date,
    dataAtualizacao: Date,
    tempoExecucao: Number,
    img: String,
    cards: [CardProjetoSchema],
    usuarios: [UsuarioProjetoSchema]
})

module.exports = mongoose.model('projeto', projetoSchema, 'projeto')