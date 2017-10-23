let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let passport = require('passport');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let lessMiddleware = require('less-middleware');
let session = require('express-session');
let flash = require('connect-flash');


let index = require('./routes/index');
let auth = require('./routes/auth');
let exercises = require('./routes/exercises');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(flash());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'somesecretkeyhere',
	resave: true,
	saveUnitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/accounts', auth);
app.use('/exercises', exercises);

//Models
let models = require("./models");

require('./config/passport/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function() { 
}).catch(function(err) {
 console.log(err, "Something went wrong with database update!")
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
