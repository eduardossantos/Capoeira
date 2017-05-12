module.exports = function(app){

		var controller = app.controllers.rodasController;

		app.get('/rodas', controller.findAll);

		app.get('/rodas/:id', function(req, res, next){
			//SetParams
			if(!req.params || !req.query){

				res.status(401).json({status : 'false', mensagem : 'Erro ao receber parametros.', data : {}});
				return;
			};

			if(isNaN(req.params.id)){
				res.status(401).json({status : 'false', mensagem : 'Não foi possível localizar o usuário', data : {}});
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