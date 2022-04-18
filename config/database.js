var mongoose = require('mongoose');
const credenciais = {
 db : 'xxxx',
 usuario : 'xxxxx',
 senha: 'xxxx',
 servidor : 'xxxxxx'
}
var uri = `mongodb+srv://${credenciais.usuario}:${credenciais.senha}@${credenciais.servidor}/${credenciais.db}?retryWrites=true&w=majority`;

module.exports = function() {
	mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

	mongoose.connection.on('connected', function() {
		console.log('Mongoose! Conectado ');
	});

	mongoose.connection.on('disconnected', function() {
		console.log('Mongoose! Desconectado');
	});

	mongoose.connection.on('error', function(erro) {
		console.log('Mongoose! Erro na conexao: ' + erro);
	});

	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
			console.log('Mongoose! Desconectado pelo término da aplicação');
			process.exit(0);
		});
	});
}