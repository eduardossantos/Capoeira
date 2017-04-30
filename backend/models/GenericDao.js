module.exports = function(app)
{
	var promise = require('bluebird'),
		message = require('../middlewares/message'),
		mysql   = require('mysql');

	var	connection = null;

	var GenericDao = {
		openConnection : function(){
			connection = mysql.createConnection({
			  host     : '104.131.181.32',
			  user     : 'root',
			  password : 'novaera2017',
			  database : 'Capoeira'
			});

			connection.connect();
		},
		execQuery : function(query){
			return new promise(function(callback, error){
				connection.query(query, function(err, rows){
					if(err){
						error(err.stack);
						return;
					}
					callback(rows);
				});
			});
		},
		insertQuery : function(query, params){
			return new promise(function(callback, error){
				connection.query(query, params, function(err, rows){
					if(err){
						error(err.stack);
						return;
					}
					callback(rows);
				})
			})
		},
		endConnection : function(){
			connection.end();
		}
	}

	return GenericDao;
}