module.exports = function(app){
	var DB = app.models.conectaDB;
	var usuarios = app.models.usuarios;

	var loginController = {
		entrar : function(req,res){

			var email = req.query.email,
				senha = req.query.senha;

			DB.conectaDB().then(function(connection){

				var params = {};
				params.columns = ['email','senha'];
				params.emailUser = 'luizsantos1992@gmail.com';

				usuarios.findOne(connection, params).then(function(data){
					
					if(email && senha){
						//Se os 2 foram informados, verificar no banco se pertence a algum usuário
						res.json({'email' : email, 'senha' : senha, 'retornoBD' : data});
					} else {
						res.json({'email' : email, 'senha' : senha});
					};	

				});

			});

		},
		sair : function(req, res){
			//req.session.destroy();
			res.redirect('/');
		}
	}

	return loginController;
}