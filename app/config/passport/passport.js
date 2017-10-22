var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {
	var User = user;
	var LocalStrategy = require('passport-local').Strategy;

	passport.use('local-signup', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true,
		},
		function(req, email, password, done) {
			var passwd = password;

			var generateHash = function(password) {
				return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
			};

			User.findOne({
				where: {
					email: email,
				}
			}).then(function(user) {
				if(user) {
					return done(null, false, {
						message: 'That email address is already registered'
					});
				} else {
					var password = generateHash(passwd);
					var data = {
						email: email,
						password: password,
						first_name: req.body.first_name,
						last_name: req.body.last_name
					};

					User.create(data).then(function(newUser, created) {
						if(!newUser) {
							return done(null, false);
						}

						return done(null, newUser);
					});
				}
			});
		}
	));

	passport.use('local-signin', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, email, password, done) {
			var User = user;

			var isValidPassword = function(password, salted) {
				return bCrypt.compareSync(password, salted);
			}

			User.findOne({
				where: {
					email: email
				}
			}).then(function(user) {
				if(!user) {
					return done(null, false, {
						message: 'Unable to find matching account details.'
					});
				}
				console.log(password, user.password)
				if(!isValidPassword(password, user.password)) {
					return done(null, false, {
						message: 'Invalid password.'
					});
				}

				return done(null, user.get());
			}).catch(function(err) {
				console.log('Error: ', err);

				return done(null, false, {
					message: 'Something went wrong. Please try again.'
				});
			});
		}
	));

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id).then(function(user) {
			if(user) {
				done(null, user.get());
			} else {
				done(user.errors, null);
			}
		});
	});
}