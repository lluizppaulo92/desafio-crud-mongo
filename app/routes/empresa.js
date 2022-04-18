module.exports = function (app) {
	var controller = app.controllers.empresa;
	var licenca = app.controllers.licenca;
	app.route("/api/empresa")
		.all([licenca.ValidarToken])
		.get(controller.filtrar)
		.post(controller.salvar)
		.delete(controller.deletar)
		.put(controller.editar);

};