const mongoose = require('mongoose');
var moment = require('moment');

module.exports = function (app) {
    var controller = {};

    /* Esse metodo irá avalidar se alguma propriedade teve alteração 
    e irá gravar apenas as que foram alteradas*/
    controller.salvar = async function (dados_novos, dados_antigo) {
        let dados = {}

        dados.id_ativo = dados_antigo._id;

        if (dados_novos.nome !== dados_antigo.nome) {
            dados.nome_new = dados_novos.nome;
            dados.nome_old = dados_antigo.nome;
        }
        if (dados_novos.modelo !== dados_antigo.modelo) {
            dados.modelo_new = dados_novos.modelo;
            dados.modelo_old = dados_antigo.modelo;
        }
        let proprietario_new = (typeof dados_novos.proprietario === 'object') ? dados_novos.proprietario._id : dados_novos.proprietario;
        let proprietario_old =  dados_antigo.proprietario.toHexString();
        if (proprietario_new !==proprietario_old) {
            dados.proprietario_new = new mongoose.mongo.ObjectId(proprietario_new);
            dados.proprietario_old = new mongoose.mongo.ObjectId(proprietario_old);
        }
        if (dados_novos.status !== dados_antigo.status) {
            dados.status_new = dados_novos.status;
            dados.status_old = dados_antigo.status;
        }
        if (dados_novos.nivel_integridade !== dados_antigo.nivel_integridade) {
            dados.nivel_integridade_new = dados_novos.nivel_integridade;
            dados.nivel_integridade_old = dados_antigo.nivel_integridade;
        }
        let unidade_new = (typeof dados_novos.unidade === 'object') ? dados_novos.unidade._id : dados_novos.unidade;
        let unidade_old = dados_antigo.unidade.toHexString();
        if (unidade_new !== unidade_old) {
            dados.unidade_new = new mongoose.mongo.ObjectId(unidade_new);
            dados.unidade_old = new mongoose.mongo.ObjectId(unidade_old);
        }

        let result = await mongoose.connection.db.collection('historico_ativo').insertOne({ ...dados, data_alteracao: moment(new Date()).format('DD/MM/YYYY hh:mm:ss') });
        return result;
    }

    controller.getHistorico = async function (req, res) {
        let id = req.headers['id_ativo'];
        if (id) id = new mongoose.mongo.ObjectId(id);
        let result = await mongoose.connection.db.collection('historico_ativo').find({ id_ativo: id }).toArray();
        return res.send(result);
    }



    return controller;
}