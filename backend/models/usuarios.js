var Promise = require('bluebird');

exports.findAll = function(connection, query){
	return new Promise(function(data, error){
		connection.query(query, function(err, results, fields){
			if(err){
				error({"erro" : err});
				return;
			}

			data(results);
		});
	});
}

exports.findOne = function(connection, params){
	return new Promise(function(data, error){
		connection.query('SELECT ?? FROM Usuarios WHERE email = ?', [params.columns, params.emailUser] ,function(err, results, fields){
			if(err){
				console.log({"erro" : err});
				return;
			}

			data(results);
		});
	});
}

exports.insert = function(connection, post){
	//var post = {id : 1, title : 'Hello World'}
	return new Promise(function(data, error){
		connection.query('INSERT INTO Usuarios WHERE SET = ?', post ,function(err, results, fields){
			if(err){
				error({"erro" : err});
				return;
			}

			data(results);
		});
	});
}