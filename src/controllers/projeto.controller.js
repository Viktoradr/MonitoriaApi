const Projeto = require("../models/projeto.model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.getProjetos = function(req, res) {
  const id = ObjectId(`${req.params.usuarioId}`);

  Projeto.find({
    usuarios: { $elemMatch: { usuarioId: id } }
  })
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => res.status(500).json(err));
};

exports.byId = function(req, res) {
  Projeto.findById(req.params.id)
    .then(doc => res.json(doc))
    .catch(err => res.status(500).json(err));
};

exports.AdicionarProjeto = function(req, res) {
  let model = new Projeto(req.body);

  model.ativo = true;
  model.dataCadastro = new Date();
  model.dataAtualizacao = null;

  model.cards.forEach(card => {
    card.cardId = mongoose.Types.ObjectId();
  });

  model
    .save()
    .then(doc => res.status(200).json(doc.ok == 1))
    .catch(err => res.status(500).json(err));
};

exports.AtualizarProjeto = function(req, res) {
  Projeto.updateOne({ _id: req.params.id }, req.body, { new: true })
    .then(doc => res.status(200).json(doc.ok == 1 && doc.nModified == 1))
    .catch(err => res.status(500).json(err));
};

exports.RemoverProjeto = function(req, res) {
  Projeto.remove({ _id: req.params.id })
    .then(doc => res.status(200).json(doc))
    .catch(err => res.status(500).json(err));
};

exports.AtualizarCardSizeProjeto = function(req, res) {
  Projeto.findById(req.params.id)
    .then(projeto => {
      let index = projeto.cards.findIndex(
        card => card.cardId == req.body.cardId
      );
      console.log(index);

      let card = projeto.cards[index];
      console.log(card);

      if (card != -1) {
        card.config.width = req.body.config.width;
        card.config.height = req.body.config.height;
        card.config.eixoX = req.body.config.eixoX;
        card.config.eixoY = req.body.config.eixoY;

        Projeto.updateOne(
          { _id: projeto._id, "cards.cardId": card.cardId },
          { $set: { "cards.$.config": card.config } },
          { new: true }
        )
          .then(doc => res.json(doc))
          .catch(err => res.status(500).json(err));
      } else {
        res.status(404).json();
      }
    })
    .catch(err => res.status(500).json(err));
};
