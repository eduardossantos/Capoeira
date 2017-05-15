module.exports = function(app){

		var controller = app.controllers.usuarioController,
			validator = require('../middlewares/validator');

		//Rota que torna todos os usuários
		app.get('/usuarios', function(req, res, next) {

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

			if(!req.body.apelido){
				message.returnJson(req, res, "O apelido é obrigatório.");
				return;
			}

			if(!req.body.email){
				message.returnJson(req, res, "O email é obrigatório.");
				return;
			}

			if(!req.body.senha){
				message.returnJson(req, res, "A senha é obrigatória.");
				return;
			}

			if(!req.body.dataNascimento || validator.Date(req.body.dataNascimento) == false){
				message.returnJson(req, res, "A data de nascimento inválida ou não informada.");
				return;
			}

			if(!req.body.sexo){
				message.returnJson(req, res, "O sexo é obrigatório.");
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