var _this = this, promise = require('bluebird');

exports.enableGooglePassport = function(app, passport)
{
	var config = require('../config/config');
	Strategy = require('passport-google-oauth').OAuth2Strategy,
	usuarioMapper = app.mapper.usuarioMapper,
	usuarioDAO = app.models.usuarioDao;
	var apiKey = 'vadiando-168718 ';


passport.use ( new Strategy({
	clientID : config.GOOGLE_ID,
	clientSecret : config.GOOGLE_SECRET,
	callbackURL : '//' + config.HOST_NAME + '/login/google/return'
	}, function(accessToken, refreshToken, profile, cb){

		var user = {
			accessToken : accessToken,
			profile : profile,
			refreshToken : refreshToken
		}

	return cb(null, user);
	})
);

app.get('/login/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login','email','openid'] }));
app.get('/login/google/return', 
	passport.authenticate('google', {failureRedirect: '/login'}),
	function(req, res) {
		console.log(req.user.profile);
	 _this.getUserData(req.user.accessToken, function(data){
	 	res.json(data);
	// 	var mapper = usuarioMapper.rowApiFacebook(JSON.parse(data));
	// 	_this.saveUser(mapper).then(function(resultSaveUser){
	// 		 mapper.setId(resultSaveUser.insertId);
	// 		_this.showUser(mapper).then(function(resultFindUser){
	// 			res.json({status : 'true', mensagem : '', loginResult : resultFindUser});
	// 		}, function(err){
	// 			res.send("Error " + err);
	// 			return;
	// 		})
	// 	}, function(err){
	// 		res.send("Error " + err);
	// 		return;
	// 	})
	})
	}
);
}

exports.getUserData = function(accessToken, callback) {

	var https = require('https');
    var buffer = ''; //this buffer will be populated with the chunks of the data received from facebook
    var request = https.get('https://www.googleapis.com/plus/v1/people/me?access_token=' + accessToken, function(result){
        result.setEncoding('utf8');
        result.on('data', function(chunk){
            buffer += chunk;
        });

        result.on('end', function(){
            callback(buffer);
        });
    });

    request.on('error', function(e){
        console.log('error from Google api: ' + e.message)
    });

    request.end();
}

exports.saveUser = function(userData){
return new promise(function(callback, error){
	usuarioDAO.create(userData).then(function(result){
		  callback(result);
		},function (err) {
		  //console.log(err);
		  error(" Erro ao criar novo usuário");
	});
});
};

exports.showUser = function(userID){
return new promise(function(callback, error){
	usuarioDAO.findById(userID).then(function(result){
			callback(result);
		},function (err) {
		  error(err);
	});
});
};

