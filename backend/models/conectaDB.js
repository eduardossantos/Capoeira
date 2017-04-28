var mysql = require('mysql'),
	Promise = require('bluebird');

var connection = null;

module.exports = {
    //
    // Conecta com o banco de dados
    //
    openConnection: function openConnection(){
    	connection = mysql.createConnection({
			host     : '104.131.181.32',
		  	user     : 'root',
		  	password : 'novaera2017',
		  	database : 'Capoeira'
		});
        connection.connect();
    },

    //
    // Executa Query
    //
    runQuery: function runQuery(columns, table, where, limit, offset) {
		return new Promise(function(data, error){
		if(!columns){
		error('É preciso informar as colunas da tabela');
		}

		if(!table){
		error('É preciso informar a tabela');
		}

		if(where){
		where = ' Where ' + where;
		} else {
		where = '';
		}

		if(limit){
		limit = ' Limit ' + limit;
		}

		if(offset){
		offset = ' Offset ' + offset;
		}

		connection.query('SELECT ?? FROM ??' + where, [columns, table], function(err, results, fields){
		if(err){
		error({"erro" : err});
		return;
		}
		data(results);
		});
	})
    },

    //
    // TRUNCATE
    //
    truncateData: function truncateData(callback) {
        var sql = 'TRUNCATE `test`.`message`';

        this.runQuery(sql, callback.bind(this));
    },

    //
    // CREATE
    //
    createData: function createData(model, callback) {
        var sql = util.format('INSERT INTO `test`.`message` (id, text) VALUES (%s, \'%s\')', model.id, model.text);

        this.runQuery(sql, callback.bind(this));
    },

    //
    // READ
    //
    readData: function readData(query,callback) {
        var sql = query;

        this.runQuery(sql, callback.bind(this));
    },


    //
    // UPDATE
    //
    updateData: function updateData(model, callback) {
        var sql = util.format('UPDATE `test`.`message` set text = concat(text, \'123\') where id = %s', model.id);

        this.runQuery(sql, callback.bind(this));
    },

    //
    // DELETE
    //
    deleteData: function deleteData(model, callback) {
        var sql = util.format('DELETE FROM `test`.`message` where id = %s', model.id);

        this.runQuery(sql, callback.bind(this));
    },

    //
    // CLOSE CONNECTION
    //
    closeConnection: function closeConnection(model, callback) {
        connection.end();
    }   
};

