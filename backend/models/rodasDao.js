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

				var page = params.page ? params.page : 1,
				limit = params.limit ? params.limit : 10,
				offset = limit * (page - 1);

				if(isNaN(req.query.limit) || req.query.limit > 30){
				genericDao.endConnection();	
				error('Limite de páginas incorreto.');
				return;
				}

				var query = "SELECT * FROM "+table +" LIMIT " + limit + " OFFSET " + offset;

				genericDao
				.execQuery(query)
				.then(function(data){
					if(data.length == 0){
						error('Nenhuma roda localizada.');
					}

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