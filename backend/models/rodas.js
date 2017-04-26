var Promise = require('bluebird');

exports.findAll = function(connection, params, where){
	
	if(where){
		where = 'WHERE ' + where;
	} else {
		where = ''
	};

	var colunasToSelected = params.columns;

	return new Promise(function(data, error){
	var sql = 'SELECT '+ colunasToSelected +' FROM ?? R INNER JOIN ?? UR ON UR.idRoda = R.id INNER JOIN ?? U on UR.idUsuario = U.id';
	var tabelas = ['Rodas','Usuarios_Rodas','Usuarios']
	var query = connection.query(sql + where, tabelas, function(err, results, fields){
		if(err){
			error({"erro" : err});
			return;
		}
		data(results);
	});
	//console.log(query.sql);
	});
}

exports.findOne = function(connection, params, where){

	if(where){
		where = 'WHERE ' + where;
	};


	return new Promise(function(data, error){
		connection.query('SELECT ?? FROM Rodas' + where, [params.columns] ,function(err, results, fields){
			if(err){
				error({"erro" : err});
				return;
			}

			query
			.on('error', function(err) {
			   	if(err){
					error({"erro" : err});
					return;
				}
		    })
			.on('result', function(row, index){
				data(row);
			});
		});
	});
}

exports.insert = function(connection, post){
	console.log(post);
	return new Promise(function(data, error){
		var query = connection.query('INSERT INTO Rodas SET ?', post ,function(err, result){
			if(err){
				error({"erro" : err});
				return;
			}

			data(result);
		});

		console.log(query.sql)
	});
};

exports.update = function(connection, post, where){
	//var post = {id : 1, title : 'Hello World'}
	if(where){
		where = ' WHERE ' + where;
	}
	return new Promise(function(data, error){
		connection.query('UPDATE Rodas SET ? WHERE ?', [post.columnsToChange, post.columnsToSearch] ,function(err, results, fields){
			if(err){
				error({"erro" : err});
				return;
			}

			data(results);
		});
	});
}