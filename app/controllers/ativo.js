const mongoose = require('mongoose');
var Upload = require('./upload');
var Historico_Ativo = require('./historicoAtivo')();


module.exports = function (app) {
    var controller = {};
    var Ativo = require('../models/ativo')();


    controller.filtrar = async function (req, res) {
        let ret;

        let nome = req.headers['nome'] || null;
        let modelo = req.headers['modelo'] || null;
        let proprietario = req.headers['proprietario'] || null;
        let status = req.headers['status'] || null;
        let nivel_integridade = req.headers['nivel_integridade'] || null;
        let unidade = req.headers['unidade'] || null;

        /*let qtd_parametros = 0;
        if (nome !== null) qtd_parametros++;
        if (modelo !== null) qtd_parametros++;
        if (status != null) qtd_parametros++;
        if (nivel_integridade != null) qtd_parametros++;

        if (qtd_parametros > 1) {
            res.status(403).send({ erro: 'Informe apenas um parâmetro para o filtro! [nome]' });
            return;
        }*/

        let param_pesq = {};
        if (nome) param_pesq.nome = { $regex: nome, $options: 'i' };
        if (modelo) param_pesq.modelo = { $regex: modelo, $options: 'i' };
        if (status) param_pesq.status = { $regex: status, $options: 'i' };
        if (nivel_integridade) param_pesq.nivel_integridade = nivel_integridade ;
        if (proprietario) param_pesq.proprietario = (typeof proprietario === 'object') ? proprietario._id : proprietario;
        if (unidade) param_pesq.unidade = (typeof unidade === 'object') ? unidade._id : unidade;

        try {
            ret = await Ativo.find(param_pesq)
                .populate('unidade')
                .populate('proprietario');
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
            let ret = await Ativo.deleteOne({ _id: id });
            await Upload.deleteArquivoCloudinary(dados.imagem);
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
            if (typeof dados.proprietario === 'object') {
                dados.proprietario = dados.proprietario._id;
            }
            if (typeof dados.undiade === 'object') {
                dados.undiade = dados.undiade._id;
            }

            if (dados.alterou_imagem) {
                let url_imagem = await Upload.addFile(dados.imagem, '');
                dados.alterou_imagem = false;
                if (Array.isArray(url_imagem)) {
                    if (url_imagem.length !== 0) {
                        await Upload.deleteArquivoCloudinary(dados.link_imagem_anterior);
                        dados.imagem = url_imagem[0]
                    }
                }
            }

            delete dados.link_imagem_anterior;

            // Obtendo o documento sem as alterações para processar o histórico 
            let dados_antigos = await Ativo.findOne({_id: id});

            await Ativo.updateOne({ _id: id }, { $set: dados });
            let ret_ativo = await Ativo.findOne({ _id: id })
                .populate('empresa');

            // gravando histórico
            //teste
            await Historico_Ativo.salvar(dados, dados_antigos);

            res.status(200).send(ret_ativo);
        } catch (erro) {
            console.log(erro);
            res.status(403).send(erro);
        }
    }

    controller.salvar = async function (req, res) {
        let dados = req.body;
        let ativo = {
            imagem: dados.imagem || null,
            nome: dados.nome || null,
            modelo: dados.modelo || null,
            proprietario: (typeof dados.proprietario === 'object') ? dados.proprietario._id : dados.proprietario,
            status: dados.status || null,
            nivel_integridade: dados.nivel_integridade || null,
            unidade: (typeof dados.unidade === 'object') ? dados.unidade._id : dados.unidade,
            alterou_imagem: dados.alterou_imagem
        }

        let url_imagem = await Upload.addFile(ativo.imagem, '');

        if (Array.isArray(url_imagem)) {
            if (url_imagem.length !== 0) {
                ativo.imagem = url_imagem[0]
            }
        }

        let ret;
        try {
            ret = await Ativo.create(ativo);
        } catch (erro) {
            console.log(erro);
            res.status(403).send(erro);
        }
        res.send(ret);
    };

    return controller;
}