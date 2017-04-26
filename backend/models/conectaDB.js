exports.conectaDB = function(){
	var Promise = require('bluebird');
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : '104.131.181.32',
	  user     : 'root',
	  password : 'novaera2017',
	  database : 'Capoeira'
	});
	
	return new Promise(function(data, error){
		connection.connect(function(err) {  		
		  
		  if (err) {
		    error('erro :' + err);
		    return;
		  }
		 
		  data(connection);
		});
	});
}