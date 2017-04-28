module.exports = function(app){
	var Promise = require('bluebird'),
		usuarios = app.models.Dao.usuarios;
	

	var loginController = {
		entrar : function(req,res){

			var where = "email = '" + req.params.email + "' AND senha = '" + req.params.senha +"'";

			usuarios.find(where).then(function(retorno){
				res.json(retorno);
			});

		},

		sair : function(req, res){
			//req.session.destroy();
			res.redirect('/');
		}
	}

	return loginController;
}