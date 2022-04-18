module.exports = function (app) {
	var controller = app.controllers.usuario;
	var licenca = app.controllers.licenca;
	app.route("/api/usuario")
		.all([licenca.ValidarToken])
		.get(controller.filtrar)
		.post(controller.salvar)
		.delete(controller.deletar)
		.put(controller.editar);

};