module.exports = function(app){
	var Promise = require('bluebird'),
		usuarioDao = app.models.usuarioDao,
		message = require('../middlewares/message');

	var loginController = {
		entrar : function(req,res){
			//SetParams
			if(!req.params || !req.query){

				message.returnJson(req, res, "Parametros não informados.");
				return;
			}

			var params = null;
			if(req.query){
				params = req.query;
			} else {
				params = req.params;
			}

			usuarioDao.
			findUserToLogin(params).then(function(result){
				res.status(200).json({'loginResult' : result});
			}, function (err) {
			  console.error(err) // if readFile was unsuccessful, let's log it but still readAnotherFile
			    res.json({data : {status : 'erro', mensagem : err}})
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