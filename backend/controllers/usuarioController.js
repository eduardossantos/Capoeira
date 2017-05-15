module.exports = function(app){
	var Promise = require('bluebird'),
		usuarioDao = app.models.usuarioDao;

	var usuarioController = {
		findById : function(req,res){

			usuarioDao.
			findById(req.params).then(function(result){
				res.json({status : 'true', mensagem : '', data : result});
			}, function (err) {
			  console.error(err) // if readFile was unsuccessful, let's log it but still readAnotherFile
			    res.json({status : 'false', mensagem : err, data : {}})
			  return;
			});

		},
		findAll : function(req,res){

			usuarioDao.
			findAll(req.query).then(function(result){
				res.json({status : 'true', mensagem : '', data : result});
			}, function (err) {
			  console.error(err) // if readFile was unsuccessful, let's log it but still readAnotherFile
			    res.json({status : 'false', mensagem : err, data : {}})
			  return;
			});

		},
		create : function(req,res){

			usuarioDao.
			create(req.body).then(function(result){
				if(result.affectedRows >= 1)
				res.status(200).json({status : 'true', mensagem : 'Usuário criado com sucesso', data : {}});
			}, function (err) {
			  console.error(err) // if readFile was unsuccessful, let's log it but still readAnotherFile
			    res.json({status : 'false', mensagem : err, data : {}})
			  return;
			});

		},
		edit : function(req,res){

			usuarioDao.
			edit(req).then(function(result){
				if(result.changedRows >= 1)
				res.status(200).json({status : 'true', mensagem : 'Usuário atualizado com sucesso', data : {}});
			}, function (err) {
			  console.error(err) // if readFile was unsuccessful, let's log it but still readAnotherFile
			    res.json({status : 'erro', mensagem : err, data : {}});
			  return;
			});

		},
		sair : function(req, res){
			//req.session.destroy();
			res.redirect('/');
		}
	}

	return usuarioController;
}