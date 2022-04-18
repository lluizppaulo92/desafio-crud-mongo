var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {
    var schema = Schema({
        nome_fantasia: {
            type: String,
            required: [true, 'O campo de Nome Fantasia é de preenchimento obrigatório!']
        },
        rasao_social: {
            type: String,
            required: [true, 'O campo de Rasão Social é de preenchimento obrigatório!']
        },
        cnpj: {
            type: String,
            required: [true, 'O campo de CNPJ é de preenchimento obrigatório!']
        },
        data_cadastro: {
            type: Date,
            default: Date.now
        }
    });
    return mongoose.model('Empresa', schema);
};