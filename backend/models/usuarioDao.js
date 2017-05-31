var promise = require('bluebird'),
validator = require('../middlewares/validator'),
mail = require('../middlewares/mail')(),
genericDao = promise.promisifyAll(app.models.GenericDao),
mapper = app.mapper.usuarioMapper;
table = 'Usuarios';

function UsuarioDAO(){
	this.table = 'Usuarios';
	this.limit = null;
	this.page = null;

}

UsuarioDAO.prototype.setLimit = function(limit){
	this.limit = parseInt(limit);
}

UsuarioDAO.prototype.getLimit = function(){
	return this.limit;	
}

UsuarioDAO.prototype.setPage = function(page){
	this.page = parseInt(page);
}

UsuarioDAO.prototype.getPage = function(){
	return this.page;
}

UsuarioDAO.prototype.findByParam = function(first_argument) {
	// body...
};

UsuarioDAO.prototype.findById = function(usuarioEntity){
	return new promise((resolve, reject) =>{

		genericDao.openConnection();

		var id = usuarioEntity.getId();

		var query = 'SELECT * FROM ?? Where id = ?';
		var arrayQuery = [this.table,id];

		genericDao
		.execQueryAsync(query, arrayQuery)
		.then(function(data){
		if(data.length == 0){
		reject('Não foi possível localizar o usuário');
		}
		var user = mapper.rowModelUsuario(data[0]);
		resolve(user);
		}, function(err){
		mail.setText(err);
		mail.sendError();
		reject('Não foi possível localizar o usuário');
		});

		genericDao.endConnection();
	});
}

UsuarioDAO.prototype.findAll = function(){
	
	return new promise((resolve, reject) =>{

	var page = this.getPage() ? this.getPage() : 1,
	limit = this.getLimit() ? this.getLimit() : 10,
	offset = limit * (page - 1);

	if(isNaN(limit) || limit > 30){
	reject('Limite de páginas incorreto.');
	return;
	}

	genericDao.openConnection();

	var colums = ['id', 'foto', 'descricao', 'apelido', 'nascimento', 'uf', 'email', 'sexo'];

	var query = 'SELECT ?? FROM ?? ORDER BY id DESC LIMIT ? OFFSET ?';
	var arrayQuery = [colums,this.table,limit,offset];
	var userArray = []; 

	genericDao
	.execQueryAsync(query,arrayQuery)
	.then(function(data){
		resolve(data);
	}, function(err){
		mail.setText(err.stack);
		mail.sendError();
		reject('não foi possível localizar os usuários');
	});

	genericDao.endConnection();

	})
};

UsuarioDAO.prototype.create = function(first_argument) {
	// body...
};

UsuarioDAO.prototype.update = function(first_argument) {
	// body...
};

module.exports = new UsuarioDAO();