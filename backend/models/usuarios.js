module.exports = function(app){

	var conectaDB = require('conectaDB');

	var usuarioModel = {
		listarUsuarios : function(query){
			return new Promise = function(retorno, erro){
				conectaDB().then(function(conexao){

					conexao.connect();

					conexao.query('SELECT * FROM TB_USUARIOS');

				});
			};
		},
		listarUsuario : function(req, res){
			//req.session.destroy();
			res.redirect('/');
		}
	}

	return usuarioModel;
}