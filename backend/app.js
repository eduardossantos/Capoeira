var config = require('./config/config'),
express = require('express'),
load = require('express-load'),
error = require('./middlewares/error'),
bodyParser = require('body-parser'),
passport = require('passport'),
passportFacebook = require('./middlewares/facebookApi');
app = express();

//Config passport-Facebook
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, cb){
	cb(null, user);
});

passport.deserializeUser(function(obj, cb){
	cb(null, obj);
});


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

load('validator')
	.then('entity')
	.then('mapper')
	.then('models')
	.then('controllers')
	.then('routes')
	.into(app);

passportFacebook.enableFacebookPassport(app, passport);

app.use(error.notFound);
app.use(error.serverError);



app.listen(config.HTTP_PORT, function(){
	console.log("Ntalk no ar.");
})	