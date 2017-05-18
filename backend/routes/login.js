module.exports = function(app){
	var login = app.controllers.login,
	    passport = require('passport'),
		facebookLogin = require('../middlewares/passport-facebook'),
		validator = require('email-validator');

		facebookLogin();

	app.get('/login', function(req, res, next){

		
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

	app.get('/auth/facebook', 
		passport.authenticate('facebook', { scope: ['user_friends']})
	);

	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook',  { session: false, failureRedirect : '/'}),
		function(req,res, next) {
        // return the token or you would wish otherwise give eg. a succes message
        // if user is authenticated in the session, carry on
		    if (req.isAuthenticated())
		     {
		     	res.json({
		     		status : true,
		     		mensagem : '',
		     		usuario : req.user
		     	});
		     } else {
		     	res.json({
		     		status : false,
		     		mensagem : 'Erro ao autenticar usuario',
		     		usuario : {}
		     	});
		     } 
    	},
    	// on error; likely to be something FacebookTokenError token invalid or already used token,
	    // these errors occur when the user logs in twice with the same token
	    function(err,req,res,next) {
	        // You could put your own behavior in here, fx: you could force auth again...
	        // res.redirect('/auth/facebook/');
	        if(err) {
	            res.status(400);
	            res.render('error', {message: err.message});
	        }
	    } 
	);

	app.get('/sair', login.sair);	
	
};