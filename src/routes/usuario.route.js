let controller = require('../controllers/usuario.controller')

let routerValidation = require('../shared/validations/router.validation')
let express = require('express')
let router = express.Router()

router.post('/usuario/login', (req, res) => {
    controller.login(req, res)
})

router.get('/usuario/combo', (req, res) => {
    controller.combo(req, res)
})

router.get('/usuarios', (req, res) => {
    controller.getUsuarios(req, res)
})

module.exports = router
