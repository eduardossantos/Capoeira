module.exports = function(app)
{
	var promise = require('bluebird'),
		message = require('../middlewares/message'),
		genericDao = app.models.GenericDao;

	var	connection = null;

	var usuarioDao = {
		findUserToLogin : function(params){
			return new promise(function(callback, error){
			var email = params.email;
			var senha = params.senha;
			
			genericDao
			.openConnection();

			var query = "SELECT * FROM Usuarios Where email ='"+email+"' AND senha='"+senha+"'";

			genericDao
			.execQuery(query)
			.then(function(data){
				if(data.length == 0){
					error('não foi possível localizar o participante');
				}
				callback(data[0]);
			});

			genericDao
			.endConnection();

			});
		},
		createUser : function(params){

			return new promise(function(callback, error){

				genericDao
				.openConnection();

				var query = 'INSERT INTO Usuarios SET ?';

				genericDao
				.insertQuery(query, params)
				.then(function(data){
					callback(data);
				}, function(err){
					error(err);
				});

				genericDao
				.endConnection();
				
			})
		}
	}

	return usuarioDao;
}