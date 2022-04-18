const bodyParser = require('body-parser');

module.exports = function (app) {
    var controller = {};
    var Licenca = require('../models/licenca')();

    controller.ValidarToken = async function (req, res, next) {
        let _token = req.headers['token'] || null;

        if (_token === null) {
            return res.status(403).json({ messagem: 'Para acessar os recursos da api é necessário informar um token fornecido pelo adm!' });
        }

        let ret_token = await Licenca.find({token : _token});

        if (ret_token) {
            if (ret_token[0].ativo) {
                next();
            } else {
                return res.status(403).json({ messagem: 'O token informado expirou!' });
            }
        } else {
            return res.status(403).json({ messagem: 'O token informado não é válido!' });
        }

    };

    controller.CadastrarToken = async function (req, res, next) {
        let dados = {
            token : req.body.token,
            ativo : req.body.ativo
        }
        return res.send(await Licenca.create(dados));
    }

    return controller;
}