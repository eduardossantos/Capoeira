exports.returnJson = function(req, res, message){
	res.status(200);
	res.json({'erro' : message});
};