module.exports = function(app)
{
	var promise = require('bluebird'),
		message = require('../middlewares/message'),
		genericDao = app.models.GenericDao;

	var usuarioDao = {
		findUserToLogin : function(usuarioEntity){
			return new promise(function(callback, error){
				
				if(!usuarioEntity.getEmail()){
					error('Campo email não informado');
				}

				if(!usuarioEntity.getSenha()){
					error('Campo senha não informado');
				}
				
				genericDao.openConnection();

				var query = "SELECT id, foto, descricao, apelido, nascimento, uf, email, sexo FROM Usuarios Where email ='"+usuarioEntity.getEmail()+"' AND senha='"+usuarioEntity.getSenha()+"'";

				genericDao
				.execQuery(query)
				.then(function(data){
					if(data.length == 0){
						error('não foi possível localizar o participante');
					}
					callback(data[0]);
				});

				genericDao.endConnection();
			});
		},
		findById : function(params){
			return new promise(function(callback, error){
				var id = params.id;
				
				genericDao.openConnection();

				var query = "SELECT id, foto, descricao, apelido, nascimento, uf, email, sexo FROM Usuarios Where id ="+id;

				genericDao
				.execQuery(query)
				.then(function(data){
					if(data.length == 0){
						error('não foi possível localizar o participante');
					}
					callback(data[0]);
				}, function(err){
					error(err);
				});

				genericDao.endConnection();

			});
		}, findAll : function(params){
			return new promise(function(callback, error){			
				
				var page = params.page ? params.page : 1,
				limit = params.limit ? params.limit : 10,
				offset = limit * (page - 1);

				if(isNaN(req.query.limit) || req.query.limit > 30){
				error('Limite de páginas incorreto.');
				return;
				}

				genericDao.openConnection();

				var query = "SELECT id, foto, descricao, apelido, nascimento, uf, email, sexo FROM Usuarios";
				query += " LIMIT " + limit + " OFFSET " + offset;

				genericDao
				.execQuery(query)
				.then(function(data){
					if(data.length == 0){
						error('não foi possível localizar o participante');
					}
					callback(data);
				}, function(err){
					error(err);
				});

				genericDao.endConnection();

			});
		},
		create : function(params){
			return new promise(function(callback, error){

				genericDao.openConnection();

				var query = 'INSERT INTO Usuarios SET ?';

				genericDao
				.insertQuery(query, params)
				.then(function(data){
					callback(data);
				}, function(err){
					error(err);
				});

				genericDao.endConnection();				
			})
		},
		edit : function(req){
			return new promise(function(callback, error){
				genericDao.openConnection();

				var query = 'Update Usuarios SET ? Where id = ' + req.params.id;

				genericDao
				.updateQuery(query, req.body)
				.then(function(data){
					callback(data);
				}, function(err){
					error(err);
				});

				genericDao.endConnection();
			})
		}
	}

	return usuarioDao;
}