var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'undistort.me' });
});

router.get('/signup', function(req, res, next) {
	res.render('accounts/signup', {title: 'undistort.me' });
});

module.exports = router;
