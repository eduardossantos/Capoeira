module.exports = function(app){
	var login = app.controllers.login,
		validator = require('email-validator');

	app.post('/login', function(req, res, next){

		//SetParams
		if(!req.body.email || !req.body.senha){
			res.status(401).json({status : 'false', mensagem : 'Erro ao validar parâmetros.', data : {}});
			return;
		}


		if(!validator.validate(req.body.email)){
			res.status(401).json({status : 'false', mensagem : 'E-mail informado está incorreto ou é inválido.', data : {}});
			return;
		}


		login.entrar(req, res, next)
	});	
	app.get('/sair', login.sair);	
	
};