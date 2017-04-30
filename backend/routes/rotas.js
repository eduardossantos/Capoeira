module.exports = function(app){
	var login = app.controllers.login,
		rodas = app.controllers.rodas,
		usuario = app.controllers.usuario;

	app.get('/login', login.entrar);	



	
};