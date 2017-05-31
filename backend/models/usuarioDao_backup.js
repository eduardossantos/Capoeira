module.exports = function(app)
{
	var promise = require('bluebird'),
		validator = require('../middlewares/validator'),
		mail = require('../middlewares/mail')(),
		genericDao = promise.promisifyAll(app.models.GenericDao),
		mapper = app.mapper.usuarioMapper;
		table = 'Usuarios';

	var usuarioDao = {
		findUserToLogin : function(usuarioEntity){
			return new promise(function(callback, error){
				
				if(!usuarioEntity.getEmail() || !validator.Isemail(usuarioEntity.getEmail())){
					error('Campo email não informado ou está incorreto');
				}

				if(!usuarioEntity.getSenha()){
					error('Campo senha não informado');
				}
				
				genericDao.openConnection();

				var colums = ['id', 'foto', 'descricao', 'apelido', 'nascimento', 'uf', 'email', 'sexo'];
				var email = usuarioEntity.getEmail();
				var senha = usuarioEntity.getSenha();

				var query = 'SELECT ?? FROM ?? Where email = ? AND senha= ?';
				var arrayQuery = [colums,table,email,senha];

				genericDao
				.execQuery(query, arrayQuery)
				.then(function(data){
					if(data.length == 0){
						error('não foi possível localizar o participante');
					}
					callback(data[0]);
				}, function(err){
					mail.setText(err);
					mail.sendError();
				});

				genericDao.endConnection();
			});
		},
		findById : function(usuarioEntity){
			return new promise(function(callback, error){
				
				genericDao.openConnection();

				var colums = ['id', 'foto', 'descricao', 'apelido', 'nascimento', 'uf', 'email', 'sexo'];
				var id = usuarioEntity.getId();

				var query = 'SELECT ?? FROM ?? Where id = ?';
				var arrayQuery = [colums,table,id];

				genericDao
				.execQueryAsync(query, arrayQuery)
				.then(function(data){
					if(data.length == 0){
						error('não foi possível localizar o usuário');
					}
					var user = mapper.rowModelUsuario(data[0]);
					callback(user);
				}, function(err){
					mail.setText(err);
					mail.sendError();
					error('não foi possível localizar o usuário');
				});

				genericDao.endConnection();

			});
		}, findAll : function(params, callback){
			return new promise(function(callback, error){			
				
				var page = params.page ? params.page : 1,
				limit = params.limit ? params.limit : 10,
				offset = limit * (page - 1);

				if(isNaN(limit) || limit > 30){
				error('Limite de páginas incorreto.');
				return;
				}

				genericDao.openConnection();

				var colums = ['id', 'foto', 'descricao', 'apelido', 'nascimento', 'uf', 'email', 'sexo'];

				var query = 'SELECT ?? FROM ?? LIMIT ? OFFSET2 ?';
				var arrayQuery = [colums,table,limit,offset];
				var userArray = [];

				genericDao
				.execQueryAsync(query,arrayQuery)
				.then(function(data){
					for (var i = 0, len = data.length; i < len; i++) {
					  userArray.push(mapper.rowModelUsuario(data[i]));
					}
					callback(userArray);
				}, function(err){
					mail.setText(err.stack);
					mail.sendError();
					error('não foi possível localizar os usuários');
				});

				genericDao.endConnection();

			});
		},
		create : function(userData){
			return new promise(function(callback, error){

				if(!userData.body){
					error('Erro ao receber parametros');
				}

				usuarioEntity = mapper.createModelUsuario(userData.body);

				//Validar parametros a serem inseridos
				if(usuarioEntity.getEmail() && !validator.Isemail(usuarioEntity.getEmail())){
					error('Campo email está incorreto');
				}

				if(!usuarioEntity.getApelido()){
					error('Campo apelido precisa ser preenchido');
				}


				if(usuarioEntity.getSenha() && usuarioEntity.getSenha().trim() < 6 ){
					error('Campo senha exige ao menos 6 dígitos');
				}

				genericDao.openConnection();

				var query = 'INSERT INTO ' + table + ' SET ?';

				genericDao
				.insertQuery(query, usuarioEntity)
				.then(function(data){
					callback(data);
				}, function(err){
					mail.setText(err.stack);
					mail.sendError();
					error('Não foi possível criar o usuário');
				});

				genericDao.endConnection();				
			})
		},
		edit : function(userData){
			return new promise(function(callback, error){

				usuarioEntity = mapper.rowModelUsuario(userData.params);

				this.usuarioDao.findById(usuarioEntity).then(function(result){
					usuarioEntity = mapper.editModelUsuario(result, userData.body);

					//Validar parametros a serem inseridos
					if(usuarioEntity.getEmail() && !validator.Isemail(usuarioEntity.getEmail())){
						error('Campo email está incorreto');
					}

					if(!usuarioEntity.getApelido()){
						error('Campo apelido precisa ser preenchido');
					}


					if(usuarioEntity.getSenha() && usuarioEntity.getSenha().trim() < 6 ){
						error('Campo senha exige ao menos 6 dígitos');
					}

					genericDao.openConnection();

					var query = 'Update ' + table + ' SET ? Where id = ' + usuarioEntity.getId();

					genericDao
					.updateQuery(query, usuarioEntity)
					.then(function(data){
						callback(data);
					}, function(err){
						mail.setText(err.stack);
						mail.sendError();
						error('Não foi possível atualizar o usuário');
					});

					genericDao.endConnection();
					
				}, function (err) {
				  //console.error(err) // if readFile was unsuccessful, let's log it but still readAnotherFile
				    error(err);
				  return;
				});
				
				
			})
		}
	}

	return usuarioDao;
}