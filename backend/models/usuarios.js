'use strict';
var Promise = require('bluebird');

function usuariosDAO(model){
	this.model = model;
}

usuariosDAO.prototype.create = function(){
	return new Promise(function(data, error){
		connection.query('SELECT ?? FROM Usuarios' + where, [params.columns], function(err, results, fields){
			if(err){
				error({"erro" : err});
				return;
			}

			data(results);
		});
	});
}

usuariosDAO.prototype.find = function(){
	
}