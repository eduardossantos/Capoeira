var Promise = require('bluebird');
'use Strict';
function connection(){

};

connection.prototype.openConnection = function(){
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
		    error('erro : ' + err);
		    return;
		  }
		 
		  data(connection);
		});
	});
};


connection.prototype.getConnection = function() {
	return new Promise(function(data){
	new connection().openConnection().then(function(connection){
		data(connection);
	});
	})
};


module.exports = function(){
	return new connection();
}