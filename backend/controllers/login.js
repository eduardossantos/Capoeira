module.exports = function(app){
	var DB = app.models.conectaDB;
	var usuarios = app.models.usuarios;

	var loginController = {
		entrar : function(req,res){

			console.log(req);

			var email = req.body.email,
				senha = req.body.senha;

			DB.conectaDB().then(function(connection){

				var params = {};
				params.columnsToSelect = ['apelido','email'];
				params.columnsToSearch = {email : email, senha : senha};

				usuarios.findOne(connection, params).then(function(data){
					
					res.json({ retorno : data});	

				}, function(error){
					res.json(error.stack);
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