module.exports = function(app){
	var login = app.controllers.login,
		validator = require('email-validator');

	app.post('/login', function(req, res, next){

		login.entrar(req, res, next)
	});

	app.get('/sair', login.sair);	
	
};