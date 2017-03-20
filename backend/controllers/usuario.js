module.exports = function(app){
	var DB = app.models.conectaDB;
	var usuarios = app.models.usuarios;

	var usuarioController = {
		buscar : function(req,res){

			DB.conectaDB().then(function(connection){

				var params = {};

				params.columnsToSelect = ['id','foto', 'descricao', 'apelido', 'nascimento', 'uf', 'email', 'senha','sexo'];
				params.columnsToSearch = req.body;

				console.log(params);

				usuarios.findOne(connection, params).then(function(data){
					res.json({ retorno : data});	

				}, function(error){
					res.json(error);
				});

			}, function(error){
				console.log(error);
				res.json(error);
			});

		},
		novo : function(req,res){

			DB.conectaDB().then(function(connection){

				var params = req.body;

				params.columnsToSelect = ['id','foto', 'descricao', 'local', 'uf', 'responsavel', 'dataHora', 'observacoes'];

				rodas.insert(connection, params).then(function(data){
					
					res.json({ retorno : data});	

				}, function(error){
					res.json(error.stack);
				});

			}, function(error){
				res.json(error);
			});

		},
		editar : function(req,res){

			DB.conectaDB().then(function(connection){

				console.log(req.body);

				var params = req.body;

				rodas.update(connection, params).then(function(data){
					
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