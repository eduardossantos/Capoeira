var Promise = require('bluebird');

exports.findAll = function(connection, params, where){

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

exports.findOne = function(connection, columns, where){

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
	console.log(post);
	return new Promise(function(data, error){
		var query = connection.query('INSERT INTO Usuarios SET ?', post ,function(err, result){
			if(err){
				error({"erro" : err});
				return;
			}

			data(result);
		});

		console.log(query.sql)
	});
}

exports.update = function(connection, post, where){

	if(where){
		where = ' WHERE = ' + where ;
	}
	//var post = {id : 1, title : 'Hello World'}
	return new Promise(function(data, error){
		connection.query('UPDATE Usuarios SET ?' + where, [post.columnsToChange] ,function(err, results, fields){
			if(err){
				error({"erro" : err});
				return;
			}

			data(results);
		});
	});
}