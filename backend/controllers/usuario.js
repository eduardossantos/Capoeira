module.exports = function(app){
	var DB = app.models.conectaDB;
	var usuarios = app.models.usuarios;

	var usuarioController = {
		buscar : function(req,res){

			DB.conectaDB().then(function(connection){

				var params = {};

				params.columnsToSelect = ['id','foto', 'descricao', 'apelido', 'nascimento', 'uf', 'email', 'senha','sexo'];
				params.columnsToSearch = req.body;

				var where = "id = '" + req.body.id + "'";

				usuarios.findOne(connection, params, where).then(function(data){
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

				if (!params.apelido && !params.nascimento && !params.uf && !params.email && !params.senha){

					res.json({ erro : true, mensagem : 'Erro ao analisar parametros', codErro : 1});

				};

				//Se não enviar informações sobre a foto joga valor NULL
				if (!params.foto){
					params.foto = 'NULL';
				};

				usuarios.insert(connection, params).then(function(data){
					
					res.json({retorno : { idUsuario : data.insertId}});	

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

				usuarios.update(connection, params).then(function(data){
					
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