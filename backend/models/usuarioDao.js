module.exports = function(app)
{
	var promise = require('bluebird'),
		validator = require('../middlewares/validator'),
		genericDao = app.models.GenericDao,
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
				.execQuery(query, arrayQuery)
				.then(function(data){
					if(data.length == 0){
						error('não foi possível localizar o participante');
					}
					var user = mapper.rowModelUsuario(data[0]);
					callback(user);
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

				if(isNaN(limit) || limit > 30){
				error('Limite de páginas incorreto.');
				return;
				}

				genericDao.openConnection();

				var colums = ['id', 'foto', 'descricao', 'apelido', 'nascimento', 'uf', 'email', 'sexo'];

				var query = 'SELECT ?? FROM ?? LIMIT ? OFFSET ?';
				var arrayQuery = [colums,table,limit,offset];
				var userArray = [];

				genericDao
				.execQuery(query,arrayQuery)
				.then(function(data){
					if(data.length == 0){
						error('não foi possível localizar o participante');
					}

					for (var i = 0, len = data.length; i < len; i++) {
					  userArray.push(mapper.rowModelUsuario(data[i]));
					}

					callback(userArray);
				}, function(err){
					error(err);
				});

				genericDao.endConnection();

			});
		},
		create : function(usuarioEntity){
			return new promise(function(callback, error){

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

				var params = {
					foto : usuarioEntity.getFoto(),
					descricao : usuarioEntity.getDescricao(),
					apelido : usuarioEntity.getApelido(),
					nascimento : usuarioEntity.getNascimento(),
					uf : usuarioEntity.getUF(),
					email : usuarioEntity.getEmail(),
					senha : usuarioEntity.getSenha(),
					sexo : usuarioEntity.getSexo(),

				};

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
		edit : function(usuarioEntity){
			return new promise(function(callback, error){
				
				//Validar parametros a serem atualizados
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

				var params = {
					foto : usuarioEntity.getFoto(),
					descricao : usuarioEntity.getDescricao(),
					apelido : usuarioEntity.getApelido(),
					nascimento : usuarioEntity.getNascimento(),
					uf : usuarioEntity.getUF(),
					email : usuarioEntity.getEmail(),
					senha : usuarioEntity.getSenha(),
					sexo : usuarioEntity.getSexo(),

				};

				var query = 'Update Usuarios SET ? Where id = ' + req.params.id;

				genericDao
				.updateQuery(query, params)
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