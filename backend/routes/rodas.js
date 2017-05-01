module.exports = function(app){

		var controller = app.controllers.rodasController;

		app.get('/rodas', controller.findAll);
		app.get('/rodas/:id', controller.findById);
		app.post('/rodas', controller.create);
		app.put('/rodas/:id', controller.edit);
};