let express = require('express');
let passport = require('passport');

let router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'undistort.me' });
});

router.get('/dashboard', loggedIn, (req, res, next) => {
	res.render('dashboard');
});

let loggedIn = (req, res, next) => {
	if (req.user)
        return next();
	         
    res.redirect('/accounts/login');
}
module.exports = router;
