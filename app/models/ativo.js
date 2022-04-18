var mongoose = require('mongoose');

var Schema = mongoose.Schema;

module.exports = function () {
	var schema = Schema({
		imagem: {
			type: String,
		},
		nome: {
			type: String,
		},
		modelo: {
			type: String,
		},
		proprietario: {
			type: Schema.Types.ObjectId, ref: 'Usuario', required: true
		},
		status: {
			type: String,
			required: true,
			enum: ['Execução', 'Maintenance', 'Alerta', 'Parado'], default: 'Parado'
		},
		nivel_integridade:
		{
			type: Number,
			min: 0,
			max: 100
		},
		unidade: {
			type: Schema.Types.ObjectId, ref: 'Unidade', required: true
		},
		data_cadastro: {
			type: Date,
			default: Date.now
		},
		alterou_imagem: {
			type: Boolean,
			default: false
		},
		link_imagem_anterior: {
			type: String
		}

	});

	return mongoose.model('Ativo', schema);
};
