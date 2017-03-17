module.exports = function(app){
	var DB = app.models.conectaDB;
	var rodas = app.models.usuarios;

	var usuarioController = {
		findAll : function(req,res){

			DB.conectaDB().then(function(connection){

				var params = {};

				params.columnsToSelect = ['id','foto', 'descricao', 'local', 'uf', 'responsavel', 'dataHora', 'observacoes'];

				rodas.findALL(connection, params).then(function(data){
					
					res.json({ retorno : data});	

				}, function(error){
					res.json(error.stack);
				});

			}, function(error){
				res.json(error);
			});

		},

		findOne : function(req,res){

			var search = req.body;

			DB.conectaDB().then(function(connection){

				var params = {};
				
				params.columnsToSelect = ['id','foto', 'descricao', 'local', 'uf', 'responsavel', 'dataHora', 'observacoes'];
				params.columnsToSearch = search;

				rodas.findOne(connection, params).then(function(data){
					
					res.json({ retorno : data});	

				}, function(error){
					res.json(error.stack);
				});

			}, function(error){
				res.json(error);
			});

		},	
		sair : function(req, res){
			//req.session.destroy();
			res.redirect('/');
		}
	}

	return usuarioController;
}