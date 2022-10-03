let controller = require("../controllers/projeto.controller");
let routerValidation = require("../shared/validations/router.validation");

let router = require("express").Router();

// QueryString => Query property on the request object
// localhost:3000/projeto?id=1001&usuarioId=10
router.get("/projeto", (req, res) => {
  if (req.query.id) {
    res.send(`You have requested a project ${req.query.id}`);
  } else {
    res.send("You have requested a project");
  }
});

router.get("/projetos/:usuarioId", (req, res) => {
  controller.getProjetos(req, res);
});

router.get("/projeto/:id", (req, res) => {
  routerValidation.ValidarParametro(req, res);
  controller.byId(req, res);
});

router.post("/projeto/novo", (req, res) => {
  routerValidation.ValidarBody(req, res);
  controller.AdicionarProjeto(req, res);
});

router.put("/projeto/atualizar/:id", (req, res) => {
  routerValidation.ValidarParametro(req, res);
  controller.AtualizarProjeto(req, res);
});

router.delete("/projeto/remover/:id", (req, res) => {
  routerValidation.ValidarParametro(req, res);
  controller.RemoverProjeto(req, res);
});

router.put("/projeto/atualizarCardSize/:id", (req, res) => {
  routerValidation.ValidarParametro(req, res);
  controller.AtualizarCardSizeProjeto(req, res);
});

module.exports = router;
