var config = require('../config/config');
var mysql      = require('mysql');

function GenericDAO(){
	var connection = null;
}

GenericDAO.prototype.openConnection = function() {
	
	connection = mysql.createConnection({
			  host     : config.HOST,
			  user     : config.USER,
			  password : config.PASSWORD,
			  database : config.DATABASE
			});
	
	connection.connect();

};

GenericDAO.prototype.execQuery = function(query, array, callback) {
	connection.query(query, array, callback);
};

GenericDAO.prototype.insertQuery = function(query, object, callback){
	connection.query(query, object, callback);
}

GenericDAO.prototype.updateQuery = function(query, object, callback){
	connection.query(query, object, callback);
}

GenericDAO.prototype.endConnection = function() {
	connection.end();
};

module.exports = new GenericDAO();