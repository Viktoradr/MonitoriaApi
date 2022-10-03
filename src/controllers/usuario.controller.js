const usuario = require("../models/usuario.model");

const getDescriptionPerfil = doc => {
  switch (doc.perfil) {
    case 0:
      doc.perfilDescricao = "master";
      break;
    case 1:
      doc.perfilDescricao = "administrador";
      break;

    default:
      doc.perfilDescricao = "comum";
      break;
  }

  return doc;
};

exports.getUsuarios = function(req, res) {
  usuario
    .aggregate()
    .match({ ativo: true })
    .lookup({
      from: "projeto",
      let: { usuarioId: "$_id" },
      pipeline: [
        { $unwind: "$usuarios" },
        {
          $match: {
            $expr: { $and: [{ $eq: ["$usuarios.usuarioId", "$$usuarioId"] }] }
          }
        },
        {
          $project: {
            nome: 1,
            categoria: 1,
            perfil: "$usuarios.perfil",
            permissoes: "$usuarios.permissoes"
          }
        }
      ],
      as: "projetos"
    }).then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => res.status(500).json(err));
};

exports.combo = function(req, res) {
  usuario
    .find()
    .then(doc => {
      res.json(
        doc.map(u => {
          return {
            _id: u._id,
            nome: u.nome
          };
        })
      );
    })
    .catch(err => res.status(500).json(err));
};

exports.login = function(req, res) {
  usuario
    .findOne({
      login: req.body.login,
      senha: req.body.senha
    })
    .then(doc => {
      doc = getDescriptionPerfil(doc);

      res.status(200).json(doc);
    })
    .catch(err => res.status(500).json(err));
};
