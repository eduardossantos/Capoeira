module.exports = function(app){
	var login = app.controllers.login;
	app.post('/entrar', login.entrar);
	app.get('/sair', login.sair);
};