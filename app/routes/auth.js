var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/signup', (req, res, next) => {
	res.render('accounts/signup', {
		title: 'undistort.me',
		message: req.flash('error')
	});
});

router.post('/register', passport.authenticate('local-signup', {
	successRedirect: '/dashboard',
	failureRedirect: '/accounts/signup',
	failureFlash: true
}));

router.get('/login', (req, res, next) => {
	res.render('accounts/login', {
		title: 'undistort.me',
		message: req.flash('error')
	});
});

router.post('/login', passport.authenticate('local-signin', {
	successRedirect: '/dashboard',
	failureRedirect: '/accounts/login',
	failureFlash: true
}));

module.exports = router;