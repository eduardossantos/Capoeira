module.exports = function(app)
{
	var promise = require('bluebird'),
		genericDao = app.models.GenericDao,
		table = 'Rodas';

	var rodasDao = {
		findById : function(params){
			return new promise(function(callback, error){
				var id = params.id;
				
				genericDao.openConnection();

				var query = "SELECT * FROM "+table+" Where id ="+id;

				genericDao
				.execQuery(query)
				.then(function(data){
					callback(data);
				}, function(err){
					error(err);
				});

				genericDao.endConnection();

			});
		}, findAll : function(params){
			return new promise(function(callback, error){			
				genericDao.openConnection();

				var query = "SELECT * FROM "+table;

				genericDao
				.execQuery(query)
				.then(function(data){
					callback(data);
				}, function(err){
					error(err);
				});

				genericDao.endConnection();

			});
		},
		create : function(params){
			return new promise(function(callback, error){

				genericDao.openConnection();

				var query = "INSERT INTO "+table+" SET ?";

				genericDao
				.insertQuery(query, params)
				.then(function(data){
					callback(data);
				}, function(err){
					error(err);
				});

				genericDao.endConnection();				
			})
		},
		edit : function(req){
			return new promise(function(callback, error){
				genericDao.openConnection();

				var query = "Update "+table+" SET ? Where id = " + req.params.id;

				genericDao
				.updateQuery(query, req.body)
				.then(function(data){
					callback(data);	
				}, function(err){
					error(err);
				});

				genericDao.endConnection();
			})
		}
	}

	return rodasDao;
}