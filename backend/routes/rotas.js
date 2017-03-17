module.exports = function(app){
	var login = app.controllers.login;

	app.get('/usuario/entrar', login.entrar);
	app.get('/usuario/sair', login.sair);
	
};