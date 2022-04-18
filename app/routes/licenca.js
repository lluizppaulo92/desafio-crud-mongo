module.exports = function (app) {
	var controller = app.controllers.licenca;
	app.route("/api/licenca")
		.post(controller.CadastrarToken)

};