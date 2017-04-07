module.exports = function(app){
	var DB = app.models.conectaDB;
	var rodas = app.models.rodas;

	var rodasController = {
		buscar : function(req,res){

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

		buscarID : function(req,res){

			var search = req.body;

			DB.conectaDB().then(function(connection){

				var params = {};
				
				params.columnsToSelect = ['id','foto', 'descricao', 'local', 'uf', 'responsavel', 'dataHora', 'observacoes'];
				
				var where = ' ID = ' + req.body.id;

				rodas.findOne(connection, params, where).then(function(data){
					
					res.json({ retorno : data});	

				}, function(error){
					res.json(error.stack);
				});

			}, function(error){
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
					res.json(error);
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

	return rodasController;
}