var Promise = require('bluebird');

exports.findAll = function(connection, params){
	return new Promise(function(data, error){
		connection.query('SELECT ?? FROM Rodas', [params.columns], function(err, results, fields){
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
		connection.query('SELECT ?? FROM Rodas WHERE email = ?', [params.columns, params.emailUser] ,function(err, results, fields){
			if(err){
				error({"erro" : err});
				return;
			}

			data(results);
		});
	});
}

exports.insert = function(connection, post){
	return new Promise(function(data, error){
		var query = connection.query('INSERT INTO Rodas SET ?', post ,function(err, results, fields){
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
		connection.query('UPDATE Rodas SET ? WHERE ?', [post.columnsToChange, post.columnsToSearch] ,function(err, results, fields){
			if(err){
				error({"erro" : err});
				return;
			}

			data(results);
		});
	});
}