var Promise = require('bluebird');
'use Strict'
function GenericDAO(connection){
	this.connection = connection;
};

GenericDAO.prototype.setTable = function(table){
	this.table = table;
}	

GenericDAO.prototype.setColumns = function(table){
	this.columns = columns;
}

GenericDAO.prototype.find = function(){
	this.connection.query("SELECT ?? FROM ??", [this.table, this.columns], function(error, results, fields){
		console.log(results);
	});
};

module.exports = function(connection){
	return new GenericDAO(connection);
};