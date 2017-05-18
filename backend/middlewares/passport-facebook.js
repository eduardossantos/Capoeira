module.exports = function(){

	var passport = require('passport')
  	, FacebookStrategy = require('passport-facebook').Strategy;

	var params = {
		clientID: '1345212755559559',
		clientSecret: '85a588bcd287c91eb81c6841f200d4d7',
		callbackURL: "http://localhost:3000/auth/facebook/callback",
		profileFields: [
		'id',
		'age_range',
		'cover', 
		'displayName', 
		'photos', 
		'email', 
		'first_name',
		'gender', 
		'last_name',
		'work',
		'friends' 
		],

	};

	passport.use(new FacebookStrategy(params,function(accessToken, refreshToken, profile, done) {
			var user = {
				'token' : accessToken,
				'nome' : profile.name.givenName + ' ' + profile.name.familyName,
				'fotoPerfil' : profile.photos[0].value,
				'id' : profile.id
			}

			done(null, user);
		}
	));

}