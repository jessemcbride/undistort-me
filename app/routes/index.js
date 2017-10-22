var express = require('express');
var passport = require('passport');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'undistort.me' });
});

router.get('/dashboard', loggedIn, function(req, res, next) {
	res.render('dashboard');
});

function loggedIn(req, res, next) {
	if (req.user)
        return next();
	         
    res.redirect('/accounts/login');
}
module.exports = router;
