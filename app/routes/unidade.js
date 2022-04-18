module.exports = function (app) {
	var controller = app.controllers.unidade;
	var licenca = app.controllers.licenca;
	app.route("/api/unidade")
		.all([licenca.ValidarToken])
		.get(controller.filtrar)
		.post(controller.salvar)
		.delete(controller.deletar)
		.put(controller.editar);

};