let routes = require('express').Router()

let projetoRoute = require('../routes/projeto.route')
let usuarioRoute = require('../routes/usuario.route')

// Handler for 404 - Resource Not Found
// routes.use((req, res, next) => {
//     res.status(404).send('You cannot pass through!')
// })

// Handler for Error 500
routes.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})

routes.use("/", projetoRoute)
routes.use("/", usuarioRoute)

module.exports = routes