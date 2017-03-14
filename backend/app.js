var express = require('express'),
load = require('express-load'),
error = require('./middlewares/error'),
app = express();

load('models')
	.then('controllers')
	.then('routes')
	.into(app);

app.use(error.notFound);
app.use(error.serverError);



app.listen(3000, function(){
	console.log("Ntalk no ar.");
})	