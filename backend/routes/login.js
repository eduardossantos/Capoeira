module.exports = function(app){
	var login = app.controllers.login;

	app.get('/entrar', login.entrar);
	app.get('/sair', login.sair);
};