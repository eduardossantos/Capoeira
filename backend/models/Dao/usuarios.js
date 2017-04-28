var Promise = require('bluebird');
var connection = require('../conectaDB');
var table = 'Usuarios';
var columns = ['id','apelido'];
'use strict';
function usuariosDAO(){

}

usuariosDAO.prototype.find = function(where, limit, offset){
return new Promise(function(data, error){
	connection.openConnection();

	connection.runQuery(columns, table, where, limit, offset).then(function(results){
		data(results);
	});

	connection.closeConnection();
})
}

module.exports = function(){
	return new usuariosDAO();
};