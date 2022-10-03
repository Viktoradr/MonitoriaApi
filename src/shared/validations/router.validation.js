exports.ValidarParametro = function (req, res) {
    if (!req.params.id) {
        return res.status(400).send('Misssing URL parameter: id')
    }
}

exports.ValidarBody = function (req, res) {
    if (!req.body) {
        return res.status(400).send('Request body is missing')
    }
}

exports.ValidarBodyId = function (param, res) {
    if (!param) {
        return res.status(400).send('Misssing URL parameter: param')
    }
}