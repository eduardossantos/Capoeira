exports.conectaDB = function(){
	var Promise = require('bluebird');
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'capoeira'
	});
	
	return new Promise(function(data, error){
		connection.connect(function(err) {  		
		  
		  if (err) {
		    error('erro :' + err.stack);
		    return;
		  }
		 
		  data(connection);
		});
	});
}