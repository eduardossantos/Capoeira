var _this = this;

exports.rowModelUsuario= function(params){

	var entity = require('../entity/usuarioEntity'), usuarioEntity = entity();
	var dateFormat = require('dateformat');

	if(params.id){
		usuarioEntity.setId(params.id);
	}

	if(params.foto){
		usuarioEntity.setFoto(params.foto);
	}

	if(params.descricao){
		usuarioEntity.setDescricao(params.descricao);
	}

	if(params.apelido){
		usuarioEntity.setApelido(params.apelido);
	}

	if(params.nascimento){
		usuarioEntity.setNascimento(dateFormat(params.nascimento, "yyyy-mm-dd"));
	}

	if(params.uf){
		usuarioEntity.setUF(params.uf);
	}

	if(params.email){
		usuarioEntity.setEmail(params.email);
	} 

	if(params.sexo){
		usuarioEntity.setSexo(params.sexo);
	}	

	delete usuarioEntity.senha;

	return usuarioEntity;
};

exports.rowApiFacebook = function(params){

	var entity = require('../entity/usuarioEntity'), usuarioEntity = entity();
	var dateFormat = require('dateformat');

	if(params.id){
		usuarioEntity.setFacebookID(params.id);
	}

	if(params.picture.data.url){
		usuarioEntity.setFoto(params.picture.data.url);
	}

	if(params.descricao){
		usuarioEntity.setDescricao(params.descricao);
	}

	if(params.name){
		usuarioEntity.setApelido(params.name);
	}

	if(params.birthday){
		usuarioEntity.setNascimento(dateFormat(params.birthday, "yyyy-mm-dd"));
	}

	if(params.uf){
		usuarioEntity.setUF(params.uf);
	}

	if(params.email){
		usuarioEntity.setEmail(params.email);
	}

	if(params.gender){
		if(params.gender == 'male')
			usuarioEntity.setSexo('M');
		else
			usuarioEntity.setSexo('F');
	}	

	delete usuarioEntity.senha;
	
	return usuarioEntity;
};

exports.createModelUsuario= function(params){

	var entity = require('../entity/usuarioEntity'), usuarioEntity = entity();
	var dateFormat = require('dateformat');

	if(params.foto){
		usuarioEntity.setFoto(params.foto);
	}

	if(params.descricao){
		usuarioEntity.setDescricao(params.descricao);
	}

	if(params.apelido){
		usuarioEntity.setApelido(params.apelido);
	}

	if(params.nascimento){
		usuarioEntity.setNascimento(dateFormat(params.nascimento, "yyyy-mm-dd"));
	}

	if(params.uf){
		usuarioEntity.setUF(params.uf);
	}

	if(params.senha){
		usuarioEntity.setSenha(params.senha);
	}

	if(params.email){
		usuarioEntity.setEmail(params.email);
	} 

	if(params.sexo){
		usuarioEntity.setSexo(params.sexo);
	}	

	delete usuarioEntity.facebookID;

	return usuarioEntity;
};

exports.editModelUsuario= function(usuarioEntity, params){

	var dateFormat = require('dateformat');

	if(params.foto){
		usuarioEntity.setFoto(params.foto);
	}

	if(params.descricao){
		usuarioEntity.setDescricao(params.descricao);
	}

	if(params.apelido){
		usuarioEntity.setApelido(params.apelido);
	}

	if(params.nascimento){
		usuarioEntity.setNascimento(dateFormat(params.nascimento, "yyyy-mm-dd"));
	}

	if(params.uf){
		usuarioEntity.setUF(params.uf);
	}

	if(params.senha){
		usuarioEntity.setSenha(params.senha);
	}

	if(params.email){
		usuarioEntity.setEmail(params.email);
	} 

	if(params.sexo){
		usuarioEntity.setSexo(params.sexo);
	}

	delete usuarioEntity.facebookID;	

	return usuarioEntity;
};