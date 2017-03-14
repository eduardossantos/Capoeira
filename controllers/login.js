module.exports = function(app){
	var loginController = {
		entrar : function(req,res){
			var email = req.body.usuario.email,
				senha = req.body.usuario.senha;

			if(email && senha){
				//Se os 2 foram informados, verificar no banco se pertence a algum usuário
				res.json({'email' : email, 'senha' : senha});
			} else {
				//Aqui entra a mensagem de erro no login;
			}	

		},
		sair : function(req, res){
			//req.session.destroy();
			res.redirect('/');
		}
	}

	return loginController;
}