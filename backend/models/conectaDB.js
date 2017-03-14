exports.conectaDB = function(){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'example.org',
	  user     : 'bob',
	  password : 'secret'
	});
	 
	return new Promise(function(retorno, erro){ 
		connection.connect(function(err) {
		  if (err) {
		    erro('error connecting: ' + err.stack);
		  }
		 
		  retorno(connection);
		});
	});
}