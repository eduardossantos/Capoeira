module.exports = function(app){
	var login = app.controllers.login,
		rodas = app.controllers.rodas,
		usuario = app.controllers.usuario;

	app.post('/login', login.entrar);	

	app.post('/usuario/novo', usuario.novo);
	app.post('/usuario/buscar', usuario.buscar);
	app.post('/usuario/editar', usuario.editar);

	app.post('/rodas/novo', rodas.novo);
	app.post('/rodas/buscar', rodas.buscar);
	app.post('/rodas/editar', rodas.editar);

	
};