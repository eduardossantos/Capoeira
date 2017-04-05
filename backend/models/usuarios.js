var Promise = require('bluebird');

exports.findAll = function(connection, params, where = null, order = null, limit = null, offset = null){

	if(where) {
		where = "WHERE " + where;
	};

	return new Promise(function(data, error){
		connection.query('SELECT ?? FROM Usuarios' + where, [params.columns], function(err, results, fields){
			if(err){
				error({"erro" : err});
				return;
			}

			data(results);
		});
	});
}

exports.findOne = function(connection, columns, where = ''){

	if(where) {
		where = "WHERE " + where;
	};

	return new Promise(function(data, error){
		var query = connection.query('SELECT ?? FROM Usuarios' + where, columns);

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
}

exports.insert = function(connection, post){
	//var post = {apelido : 'Luiz santos', senha : '1234567'}
	return new Promise(function(data, error){
		var query = connection.query('INSERT INTO Usuarios SET ?', post ,function(err, results, fields){
			if(err){
				error({"erro" : err});
				return;
			}

			data(results);
		});

		console.log(query.sql)
	});
}

exports.update = function(connection, post){
	//var post = {id : 1, title : 'Hello World'}
	return new Promise(function(data, error){
		connection.query('UPDATE Usuarios SET ? WHERE ?', [post.columnsToChange, post.columnsToSearch] ,function(err, results, fields){
			if(err){
				error({"erro" : err});
				return;
			}

			data(results);
		});
	});
}