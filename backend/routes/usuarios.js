module.exports = function(app){

		var controller = app.controllers.usuarioController;

		app.get('/usuarios', controller.findAll);
		app.get('/usuarios/:id', controller.findById);
		app.post('/usuarios', controller.create);
		app.put('/usuarios/:id', controller.edit);
};