var mongoose = require('mongoose');

var Schema = mongoose.Schema;

module.exports = function () {
	var schema = Schema({
		descricao: {
			type: String,
		},
		endereco: {
			type: String,
		},
		bairro: {
			type: String,
		},
		ponto_referencia: {
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

	return mongoose.model('Unidade', schema);
};