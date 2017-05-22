function usuarios(){
	this.id = null;
	this.foto = null;
	this.descricao = null;
	this.apelido = null;
	this.nascimento = null;
	this.uf = null;
	this.email = null;
	this.senha = null;
	this.sexo = null;
	this.facebookID = null;
}

usuarios.prototype.setId = function(id){
	this.id = id;
}

usuarios.prototype.getId = function() {
	return this.id;
};

usuarios.prototype.getFoto = function(){
	return this.foto;
}

usuarios.prototype.setFoto = function(foto){
	this.foto = foto;
}

usuarios.prototype.getDescricao = function(){
	return this.descricao;
}

usuarios.prototype.setDescricao = function(descricao){
	this.descricao = descricao;
}

usuarios.prototype.getApelido = function(){
	return this.apelido;
}

usuarios.prototype.setApelido = function(apelido){
	this.apelido = apelido;
}

usuarios.prototype.getNascimento = function(){
	return this.nascimento;
}

usuarios.prototype.setNascimento = function(nascimento){
	this.nascimento = nascimento;
}

usuarios.prototype.getUF = function(){
	return this.UF;
}

usuarios.prototype.setUF = function(UF){
	this.UF = UF;
}

usuarios.prototype.getEmail = function(){
	return this.email;
}

usuarios.prototype.setEmail = function(email){
	this.email = email;
}

usuarios.prototype.getSenha = function(){
	return this.senha;
}

usuarios.prototype.setSenha = function(senha){
	this.senha = senha;
}

usuarios.prototype.getSexo = function(){
	return this.sexo;
}

usuarios.prototype.setSexo = function(sexo){
	this.sexo = sexo;
}

usuarios.prototype.setFacebookID = function(facebookID){
	this.facebookID = facebookID;
}

usuarios.prototype.getFacebookID = function(){
	return this.facebookID;
}

module.exports = new usuarios;