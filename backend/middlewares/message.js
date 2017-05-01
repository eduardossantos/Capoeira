function message() {
	this.status = 200;
	this.mensagem = 'Ok';
}

message.prototype.setMensagem = function(mensagem){
	this.mensagem = mensagem;
}

message.prototype.setStatus = function(status){
	this.status = status;
}

message.prototype.setData = function(data){
	this.data = data;
}

message.prototype.returnJson = function(){

	var returnJson = {
		status : this.status,
		mensagem : this.mensagem,
		data : this.data
	};

	return returnJson
}

module.exports = function(){
	return new message();
}
