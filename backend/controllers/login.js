module.exports = function(app){
	var Promise = require('bluebird'),
		usuarioEntity = app.entity.usuarioEntity
		usuarioDao = app.models.usuarioDao;

	var loginController = {
		entrar : function(req,res){
			
			usuarioEntity.setEmail(req.body.email);
			usuarioEntity.setSenha(req.body.senha);

			usuarioDao.
			findUserToLogin(usuarioEntity).then(function(result){
				res.status(200).json({status : 'true', mensagem : '', 'loginResult' : result});
			}, function (err) {
			  console.error(err) // if readFile was unsuccessful, let's log it but still readAnotherFile
			    res.status(401).json({status : 'false', mensagem : err, data : {}})
			  return;
			});

		},

		sair : function(req, res){
			//req.session.destroy();
			res.redirect('/');
		}
	}

	return loginController;
}