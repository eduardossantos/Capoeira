function usuariosModel(conexao) {
	this.conexao = conexao;
}

usuariosModel.prototype.find = function(query){

	//conecta com o banco de dados
	this.conexao.query(query, function(error, results, fields){
		if(error){
			return error;
		}

		
	});

};

usuariosModel.prototype.create = function(query){

};

usuariosModel.prototype.update = function(_id, data){

};
usuariosModel.prototype.remove = function(_id){

};

module.exports = new usuariosModel(conexao){
	return new usuariosModel(conexao);
};