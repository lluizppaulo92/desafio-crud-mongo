module.exports = function (app) {
	var controller = app.controllers.ativo;
	var licenca = app.controllers.licenca;
	var historico_ativo = app.controllers.historicoAtivo;
	app.route("/api/ativo")
		.all([licenca.ValidarToken])
		.get(controller.filtrar)
		.post(controller.salvar)
		.delete(controller.deletar)
		.put(controller.editar);

		app.route("/api/ativo/historico")
		.all([licenca.ValidarToken])
		.get(historico_ativo.getHistorico)

};