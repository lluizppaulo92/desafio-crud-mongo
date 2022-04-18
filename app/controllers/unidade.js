const mongoose = require('mongoose');

module.exports = function (app) {
    var controller = {};
    var Unidade = require('../models/unidade')();

    controller.filtrar = async function (req, res) {

        let descricao = req.headers['descricao'] || null;
        let endereco = req.headers['endereco'] || null;
        let bairro = req.headers['bairro'] || null;
        let ponto_referencia = req.headers['ponto_referencia'] || null;
        let empresa = req.headers['empresa'] || null;

        let qtd_parametros = 0;
        if (descricao !== null) qtd_parametros++;
        if (endereco !== null) qtd_parametros++;
        if (bairro !== null) qtd_parametros++;
        if (ponto_referencia != null) qtd_parametros++;

        if (qtd_parametros > 1) {
            res.status(403).send({ erro: 'Informe apenas um parâmetro para o filtro! [descricao,endereco, bairro,ponto_referencia]' });
            return;
        }


        let param_pesq = {};
        if (descricao) param_pesq.descricao = { $regex: descricao, $options: 'i' };
        if (endereco) param_pesq.endereco = { $regex: endereco, $options: 'i' };
        if (bairro) param_pesq.bairro = { $regex: bairro, $options: 'i' };
        if (ponto_referencia) param_pesq.ponto_referencia = { $regex: ponto_referencia, $options: 'i' };
        if (empresa) param_pesq.empresa = (typeof empresa === 'object') ? empresa._id : empresa;


        let ret;
        try {
            ret = await Unidade.find(param_pesq)
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
            let ret = await Unidade.deleteOne({ _id: id });
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
            await Unidade.updateOne({ _id: id }, { $set: dados });
            let ret_unidade = await Unidade.findOne({ _id: id })
                .populate('empresa');;
            res.status(200).send(ret_unidade);
        } catch (erro) {
            console.log(erro);
            res.status(403).send(erro);
        }
    }

    controller.salvar = async function (req, res) {
        let dados = req.body;
        let undiade = {
            descricao: dados.descricao || null,
            endereco: dados.endereco || null,
            bairro: dados.bairro || null,
            ponto_referencia: dados.ponto_referencia || null,

            empresa: (typeof dados.empresa === 'object') ? dados.empresa._id : dados.empresa,
        }
        let ret;
        try {
            ret = await Unidade.create(undiade);
        } catch (erro) {
            console.log(erro);
            res.status(403).send(erro);
        }
        res.send(ret);
    };

    return controller;
}