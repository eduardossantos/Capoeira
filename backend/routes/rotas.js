module.exports = function(app){
	var login = app.controllers.login,
		usuario = app.controllers.usuario;

	app.post('/login', login.entrar);	

	app.post('/usuario/novo', usuario.novo);
	app.post('/usuario/buscar', usuario.buscar);
	app.post('/usuario/editar', usuario.editar);
	
};