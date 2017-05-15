module.exports = function(app){

		var controller = app.controllers.rodasController;

		app.get('/rodas', function(req, res, next){

		if(isNaN(req.query.page)){
			res.status(401).json({status : 'false', mensagem : 'Página não informada', data : {}});
			return;
		}

		if(isNaN(req.query.limit) || req.query.limit > 30){
			res.status(401).json({status : 'false', mensagem : 'Limite de páginas incorreto.', data : {}});
			return;
		}

		controller.findAll(req, res, next);
		});

		app.get('/rodas/:id', function(req, res, next){

			//SetParams
			if(!req.body || !req.params.id){
				message.returnJson(req, res, "Parametros não informados.");
				return;
			}

			if(isNaN(req.params.id)){
				res.status(401).json({status : 'false', mensagem : 'Não foi possível localizar a roda', data : {}});
				return;
			}

			controller.findById(req, res, next);
		});

		app.post('/rodas', function(req, res, next){

			//SetParams
			if(!req.body){

				message.returnJson(req, res, "Parametros não informados.");
				return;
			}

			//INSERIR CAMPOS OBRIGATÓRIOS A SEREM VALIDADOS

			controller.create(req, res, next);
		});

		app.put('/rodas/:id', function(req, res, next){

			//SetParams
			if(!req.body || !req.params.id){
				message.returnJson(req, res, "Parametros não informados.");
				return;
			}

			if(isNaN(req.params.id)){
				res.status(401).json({status : 'false', mensagem : 'Não foi possível localizar a roda', data : {}});
				return;
			}

			//INSERIR CAMPOS OBRIGATÓRIOS A SEREM VALIDADOS


			controller.edit(req, res, next);
		});

};