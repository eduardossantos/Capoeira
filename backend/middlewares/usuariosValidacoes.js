exports.createUsuarioValidation = function(req, res, next){
	
	if(!req.body.descricao)
	{
		res.json({
			status : 'false', 
			mensagem : 'É obrigatório informar a descrição', 
			data : {}
		});
	}

	if(!req.body.foto)
	{
		res.json({
			status : 'false', 
			mensagem : 'É obrigatório inserir uma foto', 
			data : {}
		});
	}

	if(!req.body.apelido)
	{
		res.json({
			status : 'false', 
			mensagem : 'É obrigatório informar o apelido', 
			data : {}
		});
	}

	if(!req.body.nascimento)
	{
		res.json({
			status : 'false', 
			mensagem : 'É obrigatório informar a data de nascimento', 
			data : {}
		});
	}

	if(!req.body.uf)
	{
		res.json({
			status : 'false', 
			mensagem : 'É obrigatório informar a UF', 
			data : {}
		});
	}

	if(!req.body.email)
	{
		res.json({
			status : 'false', 
			mensagem : 'É obrigatório informar o e-mail', 
			data : {}
		});
	}

	if(!req.body.sexo)
	{
		res.json({
			status : 'false', 
			mensagem : 'É obrigatório informar o sexo', 
			data : {}
		});
	}	
};