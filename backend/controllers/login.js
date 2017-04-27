module.exports = function(app){
	var DB = app.models.conectaDB;
	//var usuarios = app.models.usuarios;

	var loginController = {
		entrar : function(req,res){

			// console.log(req);

			res.end();
		},

		sair : function(req, res){
			//req.session.destroy();
			res.redirect('/');
		}
	}

	return loginController;
}