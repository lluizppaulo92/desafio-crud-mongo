var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {
    var schema = Schema({
        nome: {
            type: String,
        },
        login: {
            type: String,
        },
        senha: {
            type: String,
        },
        empresa: {
            type: Schema.Types.ObjectId, ref: 'Empresa', required: true
        },
        data_cadastro: {
            type: Date,
            default: Date.now
        }

    });
    return mongoose.model('Usuario', schema);
};