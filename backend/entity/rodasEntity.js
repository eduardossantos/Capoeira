function rodas(){
	this.id = '';
};


rodas.prototype.setId = function(id) {
	this.id = id;
};

rodas.prototype.getId = function(){
	return this.id;
};

module.exports = function rodas(app){
	return new rodas();
};