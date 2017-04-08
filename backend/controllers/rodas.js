module.exports = function(app){
	var DB = app.models.conectaDB;
	var rodas = app.models.rodas; usuariosRoda = app.models.usuariosRoda;

	var rodasController = {
		buscar : function(req,res){

			DB.conectaDB().then(function(connection){

				var params = {};

				params.columns = 'R.id, R.foto, U.id, U.apelido';

				rodas.findAll(connection, params).then(function(data){
					
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
				var idUsuario = req.body.idUsuario;

				delete params.idUsuario;

				if(!params.foto && !params.local && !params.uf && !params.idUsuario && !params.dataHora && !params.descricao )
				{
					res.json({ erro : true, mensagem : 'Erro ao analisar parametros', codErro : 2});
				};

				rodas.insert(connection, params).then(function(data){
					
					if(data.insertId){
						var parametros = {
							idUsuario : idUsuario,
							idRoda : data.insertId
						};

						usuariosRoda.insert(connection, parametros).then(function(data){
							res.json({retorno : { idUsuario : idUsuario}});
						});
					};

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