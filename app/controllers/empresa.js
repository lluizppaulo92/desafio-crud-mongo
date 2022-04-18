const mongoose = require('mongoose');

module.exports = function (app) {
    var controller = {};
    var Empresa = require('../models/empresa')();

    controller.filtrar = async function (req, res) {
        let cnpj = req.headers['cnpj'] || null;
        let nome_fantasia = req.headers['nome_fantasia'] || null;
        let rasao_social = req.headers['rasao_social'] || null;
        let qtd_parametros = 0;
        if (cnpj !== null) qtd_parametros++;
        if (nome_fantasia !== null) qtd_parametros++;
        if (rasao_social != null) qtd_parametros++;

        if (qtd_parametros > 1) {
            res.status(403).send({ erro: 'Informe apenas um parâmetro para o filtro! [cnpj,nome_fantasia, rasao_social]' });
            return;
        }

        let param_pesq = {};
        if (cnpj) param_pesq.cnpj = cnpj;
        if (nome_fantasia) param_pesq.nome_fantasia = { $regex: nome_fantasia, $options: 'i' };
        if (rasao_social) param_pesq.rasao_social = { $regex: rasao_social, $options: 'i' };

        let ret;
        try {
            ret = await Empresa.find(param_pesq);
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
            let ret = await Empresa.deleteOne({ _id: id });
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
            await Empresa.updateOne({ _id: id }, { $set: dados });
            let emp_save = await Empresa.findOne({ _id: id });
            res.status(200).send(emp_save);
        } catch (erro) {
            console.log(erro);
            res.status(403).send(erro);
        }
    }

    controller.salvar = async function (req, res) {
        let dados = req.body;
        let empresa = {
            nome_fantasia: dados.nome_fantasia || null,
            rasao_social: dados.rasao_social || null,
            cnpj: dados.cnpj || null

        }
        let ret;
        try {
            ret = await Empresa.create(empresa);
        } catch (erro) {
            console.log(erro);
            res.status(403).send(erro);
        }
        res.send(ret);
    };

    return controller;
}