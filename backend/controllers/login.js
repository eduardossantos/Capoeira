module.exports = function(app){
	var DB = app.models.conectaDB;
	var usuarios = app.models.usuarios;

	var loginController = {
		entrar : function(req,res){

			// console.log(req);

			var email = req.body.email,
				senha = req.body.senha; 

			DB.conectaDB().then(function(connection){

				var columnsToSelect = ['id'];
				var where = "email = '" + email + "' AND senha = '" + senha + "'";

				usuarios.findOne(connection, columnsToSelect, where).then(function(data){
					
					res.json({ retorno : data});	

				}, function(error){
					res.json(error);
				});

			}, function(error){
				res.json(error);
			});

		},

		sair : function(req, res){
			//req.session.destroy();
			res.redirect('/');
		}
	}

	return loginController;
}