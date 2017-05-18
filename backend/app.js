var express = require('express'),
load = require('express-load'),
error = require('./middlewares/error'),
bodyParser = require('body-parser'),
app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

load('validator')
	.then('models')
	.then('controllers')
	.then('routes')
	.into(app);

app.use(error.notFound);
app.use(error.serverError);



app.listen(80, function(){
	console.log("Ntalk no ar.");
})	