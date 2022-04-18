const mongoose = require('mongoose');

module.exports = function (app) {
    var controller = {};
    var Usuario = require('../models/usuario')();

    controller.filtrar = async function (req, res) {
        let ret;

        let nome = req.headers['nome'] || null;
        let login = req.headers['login'] || null;
        let empresa = req.headers['empresa'] || null;

        if (nome !== null && login !== null) {
            res.status(403).send({ erro: 'Informe apenas um parâmetro para o filtro! [nome,login]' });
            return;
        }
        let param_pesq = {};
        if (nome) param_pesq.nome = { $regex: nome, $options: 'i' };
        if (login) param_pesq.login = { $regex: login, $options: 'i' };
        if (empresa) param_pesq.empresa = (typeof empresa === 'object') ? empresa._id : empresa;

        try {
            ret = await Usuario.find(param_pesq)
                .populate('empresa');
            res.send(ret);
        } catch (erro) {
            console.log(erro);
            res.status(403).send(erro);
        }
    };

    controller.deletar = async function (req, res) {
        try {
            let dados = req.body;
            let id = new mongoose.mongo.ObjectId(dados._id);
            let ret = await Usuario.deleteOne({ _id: id });
            res.status(200).send(ret);
        } catch (erro) {
            console.log(erro);
            res.status(403).send(erro);
        }
    };

    controller.editar = async function (req, res) {
        try {
            let dados = req.body;
            let id = new mongoose.mongo.ObjectId(dados._id);
            delete dados._id;
            // Verificando se foi passado o objeto da empresa ou apenas o id
            if (typeof dados.empresa === 'object') {
                dados.empresa = dados.empresa._id;
            }
            await Usuario.updateOne({ _id: id }, { $set: dados });
            let user = await Usuario.findOne({ _id: id })
                .populate('empresa');;
            res.status(200).send(user);
        } catch (erro) {
            console.log(erro);
            res.status(403).send(erro);
        }
    }

    controller.salvar = async function (req, res) {
        let dados = req.body;
        let usuario = {
            nome: dados.nome || null,
            login: dados.login || null,
            senha: dados.senha || null,
            empresa: (typeof dados.empresa === 'object') ? dados.empresa._id : dados.empresa,
        }
        let ret;
        try {
            ret = await Usuario.create(usuario);
        } catch (erro) {
            console.log(erro);
            res.status(403).send(erro);
        }
        res.send(ret);
    };

    return controller;
}