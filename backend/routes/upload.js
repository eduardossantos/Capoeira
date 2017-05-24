module.exports = function(app){
	var login = app.controllers.login,
		upload = require('../middlewares/upload');

	app.post('/upload', function(req, res, next){

		uploadImg = new upload();
		uploadImg.setEncoding('utf-8');
		uploadImg.setDir('C:/xampp/htdocs/TurbineNode/img/');

		uploadImg.execute(req).then(function(callback){
			res.json({callback});
		}, function(err){
			console.log(err);
			res.json({err});
		});

		//login.entrar(req, res, next)
	});	
};