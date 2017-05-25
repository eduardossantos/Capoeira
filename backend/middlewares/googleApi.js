var _this = this, promise = require('bluebird');

exports.enableGooglePassport = function(app, passport)
{
	var config = require('../config/config');
	Strategy = require('passport-google-oauth').OAuth2Strategy,
	usuarioMapper = app.mapper.usuarioMapper,
	usuarioDAO = app.models.usuarioDao;

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

app.get('/login/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
app.get('/login/google/return', 
	passport.authenticate('google', {failureRedirect: '/login'}),
	function(req, res) {
	_this.getUserData(req.user.accessToken, function(data){
		var mapper = usuarioMapper.rowApiFacebook(JSON.parse(data));
		
		_this.saveUser(mapper).then(function(resultSaveUser){
			 mapper.setId(resultSaveUser.insertId);
			_this.showUser(mapper).then(function(resultFindUser){
				res.json({status : 'true', mensagem : '', loginResult : resultFindUser});
			}, function(err){
				res.send("Error " + err);
				return;
			})
		}, function(err){
			res.send("Error " + err);
			return;
		})
		
		
	})
	}
);
}

exports.getUserData = function(accessToken, callback) {

	var https = require('https');

    var options = {
        host: 'graph.facebook.com',
        port: 443,
        path: '/v2.9/me?fields=id,name,email,gender,locale,birthday,installed,picture,friends,friendlists,events&access_token=' + accessToken, //apiPath example: '/me/friends'
        method: 'GET'
    };

    var buffer = ''; //this buffer will be populated with the chunks of the data received from facebook
    var request = https.get(options, function(result){
        result.setEncoding('utf8');
        result.on('data', function(chunk){
            buffer += chunk;
        });

        result.on('end', function(){
            callback(buffer);
        });
    });

    request.on('error', function(e){
        console.log('error from facebook.getFbData: ' + e.message)
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

