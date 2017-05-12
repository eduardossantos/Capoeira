function message(req, res, next) {
	this.res = res;
	this.status = true;
	this.statusResponse = 200;
	this.mensagem = '';
}

message.prototype.setMensagem = function(mensagem){
	this.mensagem = mensagem;
}

message.prototype.setStatusResponse = function(statusResponse){
	this.statusResponse = statusResponse;
}

message.prototype.setStatus = function(status){
	this.status = status;
}

message.prototype.setData = function(data){
	this.data = data;
}

message.prototype.returnJson = function(){
	this.res.status(this.statusResponse).json({status : this.status, mensagem : this.mensagem, data : this.data});
	return;
}

module.exports = function(req, res, next){
	console.log(req.params.id);
	//return new message(req, res, next);
}
