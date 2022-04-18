var mongoose = require('mongoose');

var Schema = mongoose.Schema;

module.exports = function () {
	var schema = Schema({
		token: {
			type: String
		},
		ativo: {
			type: Boolean
		}
	});
	return mongoose.model('Licenca', schema);
};