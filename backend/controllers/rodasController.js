module.exports = function(app){
	var Promise = require('bluebird'),
		dao = app.models.rodasDao,
		message = require('../middlewares/message');

	var rodasController = {
		findById : function(req,res){
			//SetParams
			if(!req.params || !req.query){

				res.status(401).json({status : 'false', mensagem : 'Erro ao receber parametros.', data : {}});
				return;
			};

			if(isNaN(req.params.id)){
				res.status(401).json({status : 'false', mensagem : 'Não foi possível localizar o usuário', data : {}});
				return;
			}

			dao.
			findById(req.params).then(function(result){
				res.json({status : 'true', mensagem : '', data : result[0]});
			}, function (err) {
			  console.error(err) // if readFile was unsuccessful, let's log it but still readAnotherFile
			    res.json({status : 'false', mensagem : err, data : {}})
			  return;
			});
		},
		findAll : function(req,res){

			dao.
			findAll().then(function(result){
				res.json({status : 'true', mensagem : '', data : result});
			}, function (err) {
			  console.error(err) // if readFile was unsuccessful, let's log it but still readAnotherFile
			    res.json({status : 'false', mensagem : err, data : {}})
			  return;
			});
		},
		create : function(req,res){

			//SetParams
			if(!req.body){

				message.returnJson(req, res, "Parametros não informados.");
				return;
			}

			dao.
			create(req.body).then(function(result){
				if(result.affectedRows >= 1)
				res.status(200).json({status : 'true', mensagem : 'Roda criada com sucesso', data : {}});
			}, function (err) {
			  console.error(err) // if readFile was unsuccessful, let's log it but still readAnotherFile
			    res.json({status : 'false', mensagem : err, data : {}})
			  return;
			});

		},
		edit : function(req,res){
			//SetParams
			if(!req.body || !req.params.id){
				message.returnJson(req, res, "Parametros não informados.");
				return;
			}

			if(isNaN(req.params.id)){
				res.status(401).json({status : 'false', mensagem : 'Não foi possível localizar a roda', data : {}});
				return;
			}

			dao.
			edit(req).then(function(result){
				if(result.changedRows >= 1)
				res.status(200).json({status : 'true', mensagem : 'Roda atualizada com sucesso', data : {}});
			}, function (err) {
			  console.error(err) // if readFile was unsuccessful, let's log it but still readAnotherFile
			    res.json({status : 'erro', mensagem : err, data : {}});
			  return;
			});

		}
	}

	return rodasController;
}