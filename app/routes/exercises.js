var express = require('express');
var moodLog = require('./exercises/moodLog');

var router = express.Router();

router.get('/mood-log', loggedIn, moodLog.start);

function loggedIn(req, res, next) {
	if (req.user)
        return next();
	         
    res.redirect('/accounts/login');
}
module.exports = router;
