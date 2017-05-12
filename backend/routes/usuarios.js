module.exports = function(app){

		var controller = app.controllers.usuarioController;

		//Rota que torna todos os usuários
		app.get('/usuarios', function(req, res, next) {

			controller.findAll(req, res, next);
		});

		//Rota para retorno dos dados de um usuário
		app.get('/usuarios/:id', function(req, res, next){
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

		//Rota para criação do usuário
		app.post('/usuarios', function(req, res, next){
			//SetParams
			if(!req.body){

				message.returnJson(req, res, "Parametros não informados.");
				return;
			}

			controller.create(req, res, next);
		});

		//Rota para edição do usuário
		app.put('/usuarios/:id', function(req, res, next){
			//SetParams
			if(!req.body || !req.params.id){
				message.returnJson(req, res, "Parametros não informados.");
				return;
			}

			if(isNaN(req.params.id)){
				res.status(401).json({status : 'false', mensagem : 'Não foi possível localizar o usuário', data : {}});
				return;
			}

			controller.edit(req, res, next);
		});
};