var Promise = require('bluebird');

exports.findAll = function(connection, params){
	return new Promise(function(data, error){
		connection.query('SELECT ?? FROM Usuarios', [params.columns], function(err, results, fields){
			if(err){
				error({"erro" : err});
				return;
			}

			data(results);
		});
	});
}

exports.findOne = function(connection, params){

	console.log((params.columnsToSearch).length);

	for each (var parametro in params.columnsToSearch) {
	  console.log(parametro);
	};


	return new Promise(function(data, error){
		var query = connection.query('SELECT ?? FROM Usuarios WHERE ?', [params.columnsToSelect, params.columnsToSearch] ,function(err, results, fields){
			if(err){
				error({"erro" : err});
				return;
			}

			data(results);
		});

		console.log(query.sql);
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