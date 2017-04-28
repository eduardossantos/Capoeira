module.exports = function(app){
	var Promise = require('bluebird'),
		usuarios = app.models.Dao.usuarios;
	

	var loginController = {
		entrar : function(req,res){

			var where = "email = '" + req.query.email + "' AND senha = '" + req.query.senha +"'";
			console.log(where);

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